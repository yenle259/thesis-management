import { ModuleDetails } from "@/apis/models/ModuleDetails";

interface Option {
  title: string;
  value: string;
  subtitle: string;
  subvalue: string;
}

export function useModuleOptions(modules: ModuleDetails[]): Option[] {
  return modules.map((module) => ({
    title: module.moduleId + " | " + module.name,
    value: module._id,
    subvalue: module.moduleId,
    subtitle: module.name,
  }));
}
