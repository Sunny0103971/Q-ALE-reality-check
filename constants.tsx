
import { Role, MaturityLevel, Question } from './types';

export const MATURITY_LEVELS: MaturityLevel[] = [
  { level: 1, label: 'The Ghost Town', emoji: '👻', description: 'No action taken. We didn\'t even know we were supposed to do this.' },
  { level: 2, label: 'The Cowboy Era', emoji: '🤠', description: 'Sometimes done in panic. No written rules, just vibes.' },
  { level: 3, label: 'The Rulebook', emoji: '📘', description: 'Official policy exists. We usually follow it.' },
  { level: 4, label: 'The Well-Oiled Machine', emoji: '⚙️', description: 'Clockwork execution. slick and monitored.' },
  { level: 5, label: 'The Jedi Master', emoji: '🧘', description: 'In our DNA. Serving as a best practice example.' }
];

export const ROOT_CAUSES = [
  "We forgot to write it down. (No written guideline)",
  "We don't know how yet. (Lack of training)",
  "We are swamped. (Time constraints)",
  "The budget says no. (Funding limits)",
  "It's just not our vibe yet. (Culture not embedded)"
];

export const RESPONSIBILITIES = [
  "The Boss (Manager)",
  "The Architect (Organiser)",
  "The Talent (Educator)"
];

export const TIMELINES = [
  "Next cohort (We’re on it!)",
  "Within 6 months (Give us a minute...)",
  "Within 12 months (It’s a big project.)"
];

export const SECTIONS_DATA: Question[] = [
  // SECTION 0: Foundation (Institutional Role)
  { id: '3.0.1', text: 'Structured Feedback: Collection and analysis of structured learner feedback for every cycle.', hint: 'Do we ask them, or do we just guess and hope they liked it?', role: Role.FOUNDATION, section: 'Universal QA' },
  { id: '3.0.2', text: 'Monitoring & Evaluation: Execution of M&E for every cycle with recorded results.', hint: 'Do we write it down, or does the data disappear into the void?', role: Role.FOUNDATION, section: 'Universal QA' },
  { id: '3.0.3', text: 'Institutional Self-Evaluation: Using recognised cycles (specifically PDCA).', hint: 'Plan-Do-Check-Act, or "Plan-Do-Panic"?', role: Role.FOUNDATION, section: 'Universal QA' },
  { id: '3.0.4', text: 'Evidence-Based Updates: Updating programs strictly based on documented evidence.', hint: 'Data-driven changes or just because it felt urgent?', role: Role.FOUNDATION, section: 'Universal QA' },
  { id: '3.0.5', text: 'Stakeholder Involvement: Active involvement of partners/alumni in design.', hint: 'Talk to the outside world, or live in a bubble?', role: Role.FOUNDATION, section: 'Universal QA' },
  { id: '3.0.6', text: 'Documentation: Maintenance of written policies to support all processes.', hint: 'The "Bus Factor": If you left, is it all written down?', role: Role.FOUNDATION, section: 'Universal QA' },

  // SECTION 1: Manager (M1 - M24)
  { id: 'M.1', text: 'System for collecting feedback and modifying offerings.', hint: 'When they complain, do we actually change?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.2', text: 'Guidelines supporting educators in creating "safe spaces".', hint: 'Handle the room or throw them to the wolves?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.3', text: 'Annual cross-program review for learner-centric approach.', hint: 'Look at the big picture once a year?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.4', text: 'Integration of participatory processes into daily culture.', hint: 'Practice participation in boring staff meetings?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.5', text: 'Involvement of community/stakeholders in creation/review.', hint: 'Open doors or keep gates closed?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.6', text: 'Adherence to communication guidelines for all staff.', hint: 'Rules so nobody gets ghosted?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.7', text: 'Active management of GDPR policy and data protection.', hint: 'Data locked up or on sticky notes?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.8', text: 'Annual review of values and ethical principles.', hint: 'Lived values or just wall decoration?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.9', text: 'Documentation of financial records and funding use.', hint: 'Transparent: know where every Euro went.', role: Role.MANAGER, section: 'Management' },
  { id: 'M.10', text: 'Public recruitment procedures and candidate feedback.', hint: 'Respect applicants even if not hired?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.11', text: 'Annual training cycle for trainers (expert, andragogical).', hint: 'Smartening up or recycling skills from 2015?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.12', text: 'Regular use of institutional self-assessment (PDCA).', hint: 'Looking in the mirror regularly?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.13', text: 'Conduct of needs analysis for programs and updates.', hint: 'Research needs or copy-paste last year?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.14', text: 'Tracking of short/medium-term learning outcomes.', hint: 'Do they get jobs? Do they get happier?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.15', text: 'Collection of long-term impact evidence.', hint: 'Check in on them a year later?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.16', text: 'Annual review of anti-discrimination in recruitment.', hint: 'Diversity is a strategy, not an accident.', role: Role.MANAGER, section: 'Management' },
  { id: 'M.17', text: 'Accessibility of premises/resources for disabilities.', hint: 'Wheelchair access? Dyslexia-friendly font?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.18', text: 'Staff training on inclusive practices.', hint: 'Full training or just a 5-minute video?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.19', text: 'Review of participation to identify inequities.', hint: 'Check who ISN\'T showing up?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.20', text: 'Integration of sustainability goals into mission/strategy.', hint: 'Green thinking as part of the plan?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.21', text: 'Financial planning for stability beyond projects.', hint: 'Solid or sweating about monthly funding?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.22', text: 'Annual environmental policy review for resources.', hint: 'Carbon footprint tracking?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.23', text: 'HR guidelines for work-life balance and well-being.', hint: 'Preaching wellness but emailing at 10 PM?', role: Role.MANAGER, section: 'Management' },
  { id: 'M.24', text: 'Promotion of sustainable behaviours in staff/learners.', hint: 'Walking the talk?', role: Role.MANAGER, section: 'Management' },

  // SECTION 2: Course Organiser (C1 - C16)
  { id: 'C.1', text: 'Design of courses based on monitored actual needs.', hint: 'Need it or just think it\'s cool?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.2', text: 'Flexible learning pathways for different life situations.', hint: 'Busy single parent friendly?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.3', text: 'System for modifying learning offer based on feedback.', hint: 'Agile enough to pivot?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.4', text: 'Involvement of stakeholders in specific programs.', hint: 'Co-create or just deliver?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.5', text: 'Use of peer review as a formal method for evaluation.', hint: 'Colleagues critique or too proud?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.6', text: 'Transparency and fairness of learning assessment.', hint: 'Clear rules of the game from Day 1?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.7', text: 'Confidential feedback mechanism (free from reprisal).', hint: 'Can they say "this sucks" without fear?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.8', text: 'Accuracy of content (bias-free and evidence-based).', hint: 'Fact-checked or "trust me, bro"?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.9', text: 'Clear learning objectives and measurable outcomes.', hint: 'Success defined before starting?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.10', text: 'Recording M&E results for cohort comparison.', hint: 'Prove we are getting better over time?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.11', text: 'Alignment with real-life contexts of adult learners.', hint: 'Work on Monday morning or just theory?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.12', text: 'Learner involvement in co-designing activities.', hint: 'WITH them or FOR them?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.13', text: 'Challenging prejudice and fostering respect.', hint: 'Plan for bias or just awkward?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.14', text: 'Program co-design for diverse perspectives.', hint: 'Case studies represent everyone?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.15', text: 'Partnerships maintained beyond project lifetimes.', hint: 'Alive after the money runs out?', role: Role.ORGANISER, section: 'Organisation' },
  { id: 'C.16', text: 'Reuse and reinvestment of materials/resources.', hint: 'Reinventing the wheel every time?', role: Role.ORGANISER, section: 'Organisation' },

  // SECTION 3: Educator (E1 - E16)
  { id: 'E.1', text: 'Use of andragogical tools to create a safe space.', hint: 'Safe vibe or exam stress?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.2', text: 'Reflective thinking and dialogue for autonomy.', hint: 'Think or memorise?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.3', text: 'Integration of learner experiences (experiential).', hint: 'Wisdom in the room or one expert?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.4', text: 'Use of peer learning as an andragogical method.', hint: 'Let them teach each other?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.5', text: 'Encouragement of critical thinking in the group.', hint: 'Love being challenged?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.6', text: 'Assurance of open communication and dialogue.', hint: 'Real dialogue or following script?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.7', text: 'Application of fair and transparent assessment.', hint: 'Grade fairly or have favourites?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.8', text: 'Content free from political/commercial bias.', hint: 'Teaching facts or preaching opinions?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.9', text: 'Respect and protection of intellectual property.', hint: 'Credit sources or "invented" it?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.10', text: 'Alignment with learners\' real-life constraints.', hint: 'Reading the room? Tired people + 50 slides?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.11', text: 'Collection of feedback during delivery for adaptation.', hint: 'Lost? Catch it now or at end review?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.12', text: 'Active challenging of prejudice/discrimination.', hint: 'Guardian of the vibe? Shut it down.', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.13', text: 'Support for individuals in problematic situations.', hint: 'Protect the vulnerable?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.14', text: 'Responsible management of venues and materials.', hint: 'Forest of paper in the bin?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.15', text: 'Inclusion of sustainability in teaching practice.', hint: 'Help them think about the future?', role: Role.EDUCATOR, section: 'Teaching' },
  { id: 'E.16', text: 'Documentation of andragogical methods used.', hint: 'Record what worked for next time?', role: Role.EDUCATOR, section: 'Teaching' }
];
