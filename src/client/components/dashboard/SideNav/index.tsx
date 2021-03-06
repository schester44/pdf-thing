import { Project, ProjectUsers } from "@client/graphql/types.generated";
import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { BiCog, BiHomeSmile } from "react-icons/bi";
import { RiLayoutMasonryLine } from "react-icons/ri";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BsLayoutWtf } from "react-icons/bs";
import NavMenuItem from "./MenuItem";
import ProjectDropdown from "./ProjectDropdown";

type SideNavProps = {
  projects: ProjectUsers[];
  activeProject?: Project;
};

// TODO FIX PROJECTDROPDOWN

const SideNav = ({ projects, activeProject }: SideNavProps) => {
  if (!activeProject) return null;

  return (
    <div className="bg-white h-full w-[300px] px-6 py-3">
      <ProjectDropdown activeProject={activeProject} projects={projects}>
        {({ open }) => {
          return (
            <Menu.Button as={Fragment}>
              <div className="flex items-center text-gray-700 cursor font-medium">
                <div className="rounded w-7 h-7 bg-indigo-400 text-white mr-3 shadow flex items-center justify-center uppercase">
                  {activeProject.name.charAt(0)}
                </div>

                <div className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[180px]">
                  {activeProject.name}
                </div>

                {open ? (
                  <FiChevronUp className="text-xl ml-2" />
                ) : (
                  <FiChevronDown className="text-xl ml-2" />
                )}
              </div>
            </Menu.Button>
          );
        }}
      </ProjectDropdown>

      <div className="mt-8">
        <NavMenuItem label="Home" href="/app" icon={<BiHomeSmile className="text-lg" />} />
        <NavMenuItem
          label="Templates"
          href="/templates"
          icon={<RiLayoutMasonryLine className="text-lg" />}
        />

        <NavMenuItem label="Settings" href="/app/settings" icon={<BiCog className="text-lg" />} />
      </div>
    </div>
  );
};

export default SideNav;
