'use strict';
const _ = require('underscore');

class JobController {
	constructor(server) {
		this.server = server;
		this.jobs = {};
		this.unassigned = new Set();
		this.assigned = new Set(); // those assigned roles that spawn on the station.
		this.job_landmarks = {};

		this.minimal_access = this.server.game_options.jobs_have_minimal_access;

		this.importModule(require('./job_types/assistant.js'));
		this.importModule(require('./job_types/cargo.js'));
		this.importModule(require('./job_types/chaplain.js'));
		this.importModule(require('./job_types/command.js'));
		this.importModule(require('./job_types/civilian.js'));
		this.importModule(require('./job_types/engineering.js'));
		this.importModule(require('./job_types/medical.js'));
		this.importModule(require('./job_types/science.js'));
		this.importModule(require('./job_types/security.js'));
		this.importModule(require('./job_types/service.js'));
	}

	assign_role(mind, job, {latejoin = false, run_checks = true} = {}) {
		if(run_checks && !this.can_be_job(mind, job, {latejoin}))
			return false;
		job.current_positions++;
		this.unassigned.delete(mind);
		if(!latejoin)
			this.assigned.add(mind);
		mind.assigned_role = job;
		return true;
	}

	reject_player(mind) {
		// oof
		// TODO make antags not
		this.unassigned.delete(mind);
	}

	// Okay tg was being really retarded and put the same list of checks literally everwhere
	// so I'm doing this to avoid that bullshit
	can_be_job(mind, job, {latejoin = false} = {}) {
		if(mind.restricted_roles.has(job.id))
			return false;
		if(latejoin && job.total_positions != -1 && job.current_positions > job.total_positions)
			return false;
		if(!latejoin && job.spawn_positions != -1 && job.current_positions > job.spawn_positions)
			return false;
		return true;
	}

	find_occupation_candidates(job, level) {
		let candidates = [];
		if(job.spawn_positions != -1 && job.current_positions > job.spawn_positions)
			return candidates; // this ain't gonna be useful so let's get out of here.
		for(let mind of this.unassigned) {
			if(!this.can_be_job(mind, job))
				continue;
			if(mind.character_preferences.job_preferences[job.id] >= level)
				candidates.push(mind);
		}
		return candidates;
	}

	give_random_job(mind) {
		for(let job of _.shuffle(Object.values(this.jobs))) {
			if(job && job.id != "assistant" && !job.departments.includes("command") && this.can_be_job(mind, job)) {
				if(this.assign_role(mind, job))
					return true;
			}
		}
		return false;
	}

	//This method is called before the level loop of divide_occupations() and will try to select a head,
	//ignoring ALL non-head preferences for every level until it locates a head or runs out of levels to check
	//This is basically to ensure that there's atleast a few heads in the round
	fill_head_position () {
		for(let level of [3,2,1]) {
			for(let job of _.shuffle(Object.values(this.jobs))) {
				if(!job.departments.includes("command"))
					continue;
				let candidates = this.find_occupation_candidates(job, level);
				if(!candidates.length)
					continue;
				let candidate = _.sample(candidates);
				if(this.assign_role(candidate, job))
					return true;
			}
		}
		return false;
	}

	check_head_positions(level) {
		for(let job of _.shuffle(Object.values(this.jobs))) {
			if(!job.departments.includes("command"))
				continue;
			let candidates = this.find_occupation_candidates(job, level);
			if(!candidates.length)
				continue;
			let candidate = _.sample(candidates);
			this.assign_role(candidate, job);
		}
	}

	fill_ai_position() {
		// we don't even have AI's yet, but when we do this will assign an AI position
		let job = this.jobs.ai;
		if(!job) // There's no AI job implemented yet? Wow, who could have guessed.
			return false;
		let success = false;
		for(let i = job.spawn_positions - 1; i >= 0; i--) {
			for(let level of [3,2,1]) {
				let candidates = this.find_occupation_candidates(job, level);
				if(candidates.length) {
					let candidate = _.sample(candidates);
					if(this.assign_role(candidate, job)) {
						success = true;
						break;
					}
				}
			}
		}
		return success;
	}

	importModule(mod) {
		if(mod) {
			if(mod.jobs) {
				for(let [id, job] of Object.entries(mod.jobs)) {
					if(this.jobs[id])
						throw new Error(`Job '${id}' defined!`);
					this.jobs[id] = job;
					job.id = id;
				}
			}
		}
	}

	divide_occupations() {
		if(this.unassigned.size == 0)
			return false;

		if(this.server.game_options.minimal_access_threshold) {
			if(this.server.game_options.minimal_access_threshold > this.unassigned.size)
				this.minimal_access = false;
			else
				this.minimal_access = true;
		}

		// people who want to be assistants, sure, go on.
		for(let candidate of this.find_occupation_candidates(this.jobs.assistant, 1)) {
			this.assign_role(candidate, this.jobs.assistant);
		}

		this.fill_head_position();
		this.fill_ai_position();

		for(let level of [3,2,1]) {
			this.check_head_positions(level);

			for(let mind of _.shuffle([...this.unassigned])) {
				for(let job of _.shuffle(Object.values(this.jobs))) {
					if(!job)
						continue;
					if(!this.can_be_job(mind, job))
						continue;
					if(mind.character_preferences.job_preferences[job.id] >= level) {
						this.assign_role(mind, job);
						break;
					}
				}
			}
		}
		// Hand out random jobs to those who didn't in the last check
		// also makes sure to get their preference correct

		for(let mind of [...this.unassigned]) {
			if(!this.can_be_job(mind, this.jobs.assistant) && mind.character_preferences.jobless_role != "none")
				this.give_random_job(mind);// you get to roll for random before everyone else just to be sure you don't get assistant. you're so speshul
		}
		for(let mind of [...this.unassigned]) {
			if(mind.character_preferences.jobless_role == "random")
				this.give_random_job(mind);
		}

		// for those who wanted to be assistant
		for(let mind of [...this.unassigned]) {
			if(mind.character_preferences.jobless_role == "assistant")
				this.assign_role(mind, this.jobs.assistant);
			else
				this.reject_player(mind);
		}

		for(let mind of [...this.unassigned]) { //Players that wanted to back out but couldn't because they're antags (can you feel the edge case?)
			if(!this.give_random_job(mind)) { // try a random one
				// now for the greatest edge case:
				// you rolled antag, *and* you're jobbanned from assistant *and* you can't get literally any other job
				// you may now feel good about being the greatest edge case in the history of edge cases.
				// oh yeah and just this once you get to be assistant even though you're jobbanned. edge case.
				this.assign_role(mind, this.jobs.assistant, {run_checks: false}); // run_checks = false, because you *NEED A FUCKING JOB DAMN IT ALL ANTAGS NEED JOBS*
			}
		}
		return true;
	}

	send_to_atom(mob, atom) {
		if(!atom)
			return;
		if(atom.is_base_loc || atom.is_fine_loc)
			mob.loc = atom;
		else
			mob.loc = atom.base_mover.fine_loc;
	}

	send_to_late_join(mob, buckle = true) {
		if(this.arrivals_area) {
			let chairs = this.arrivals_area.c.AreaArrivals.chairs;
			if(chairs && chairs.length) {
				let chair = _.sample(chairs);
				this.send_to_atom(mob, chair, buckle);
				return;
			}
		}
		this.send_to_atom(mob, this.server.location(0,0,0), buckle);
	}

	send_to_spawn(mob, landmark_name) {
		let landmarks_list = this.job_landmarks[landmark_name];
		if(landmarks_list && landmarks_list.length) {
			let landmark = landmarks_list.shift(); // we rotate through the landmarks. If we have more jobs than landmarks, I guess people can spawn on top of each other.
			landmarks_list.push(landmark);
			this.send_to_atom(mob, landmark);
		} else {
			this.send_to_late_join(mob);
		}
	}
}

module.exports.now = function(server) {
	server.job_controller = new JobController(server);
};
