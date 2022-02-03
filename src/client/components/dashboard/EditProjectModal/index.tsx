import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@client/components/dashboard/Button";
import { Project, useUpdateProjectMutation } from "@client/graphql/types.generated";

type Props = {
  project: Project;
  onClose: () => void;
  open?: boolean;
};

const EditProjectModal = ({ project, onClose, open = true }: Props) => {
  const [{ fetching }, updateProject] = useUpdateProjectMutation();

  const [name, setName] = React.useState(project.name);

  function handleUpdate() {
    updateProject({ id: project.id, name }).then(onClose);
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto flex w-full h-full justify-center items-center"
        open={open}
        onClose={onClose}
        static
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-900 opacity-50" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left p-6">
              <Dialog.Title className="text-lg leading-6 font-medium text-gray-900">
                Edit Project Name
              </Dialog.Title>

              <div className="mt-2">
                <div className="py-4">
                  <input
                    aria-label="Project Name"
                    name="name"
                    placeholder="Project"
                    className=" appearance-none relative mt-1 rounded block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    value={name}
                    onChange={({ target: { value } }) => setName(value)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 sm:px-6 sm:py-4 sm:flex-wrap sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:flex-row-reverse">
                <Button
                  type="primary"
                  isLoading={fetching}
                  isDisabled={name.trim().length === 0}
                  className="w-full mt-2 sm:ml-3 sm:mt-0 sm:w-auto mb-2 sm:mb-0"
                  onClick={handleUpdate}
                >
                  Update
                </Button>

                <Button className="w-full sm:w-auto" onClick={() => onClose()}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default EditProjectModal;
