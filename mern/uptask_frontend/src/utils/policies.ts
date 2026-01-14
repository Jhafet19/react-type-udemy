import {Project, TeamMember} from "@/types/index.ts";

export const isManager =
    (managerId: Project['manager'], userId: TeamMember['_id']) => managerId === userId