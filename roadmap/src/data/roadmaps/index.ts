import { backendRoadmap } from "./backend";
import { golangRoadmap } from "./golang";
import { pythonRoadmap } from "./python";
import { sqlRoadmap } from "./sql";
import { apiRoadmap } from "./api";
import { RoadmapTopic } from "@/types/roadmap";
import { gitRoadmap } from "./git";
import { linuxRoadmap } from "./linux";
import { systemDesignRoadmap } from "./system-design";
import { rustRoadmap } from "./rust";
import { dockerRoadmap } from "./docker";
import { awsRoadmap } from "./aws";
import { promptRoadmap } from "./prompt";

export const roadmaps: Record<string, RoadmapTopic> = {
  backend: backendRoadmap,
  api: apiRoadmap,
  golang: golangRoadmap,
  python: pythonRoadmap,
  sql: sqlRoadmap,
  systemDesign: systemDesignRoadmap,
  git: gitRoadmap,
  rust: rustRoadmap,
  docker: dockerRoadmap,
  aws: awsRoadmap,
  linux: linuxRoadmap,
  prompt: promptRoadmap,
};
