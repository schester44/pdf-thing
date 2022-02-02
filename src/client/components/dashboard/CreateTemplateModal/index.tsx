import React, { Fragment } from "react";
import Button from "@client/components/dashboard/Button";
import {
  ProjectTemplate,
  useCreateProjectMutation,
  useCreateTemplateMutation,
} from "@client/graphql/types.generated";
import Router from "next/router";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
  onCreate: (data: ProjectTemplate) => void;
  onClose: () => void;
  open?: boolean;
};

const alphaRegex = new RegExp(/[^a-zA-Z-_0-9]/gi);

const CreateTemplatetModal = ({ onCreate, onClose, open = true }: Props) => {
  const [{ fetching }, createTemplate] = useCreateTemplateMutation();
  const [name, setName] = React.useState("");
  const [key, setKey] = React.useState("");

  function handleAction() {
    createTemplate({ name, key }).then(({ data }) => {
      if (data?.createTemplate) {
        onCreate(data.createTemplate);
      }
    });
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-hidden"
        open={open}
        onClose={onClose}
        static
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            leave="ease-in duration-200"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 opacity-50" />
          </Transition.Child>
        </div>

        <Transition.Child
          as="div"
          className="w-screen h-screen flex justify-center items-center"
          enter="transition ease-out duration-300"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
            <div>
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">New Template</h3>
                <div className="pt-4">
                  <label className="text-xs text-gray-500">Template Name</label>

                  <input
                    aria-label="Template Name"
                    name="name"
                    placeholder="Billing Invoice"
                    className=" appearance-none relative mt-1 rounded block w-full px-4 py-3 border border-gray-300 placeholder-gray-300 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    value={name}
                    onChange={({ target: { value } }) => setName(value)}
                  />
                </div>
                <div className="pt-4">
                  <label className="text-xs text-gray-500">Template Key</label>

                  <input
                    aria-label="Template Key"
                    name="name"
                    placeholder="billing-invoice"
                    className=" appearance-none relative mt-1 rounded block w-full px-4 py-3 border border-gray-300 placeholder-gray-300 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    value={key}
                    onChange={({ target: { value } }) => {
                      setKey(value.replace(alphaRegex, ""));
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="sm:flex sm:flex-row-reverse pt-6">
              <Button
                type="primary"
                isLoading={fetching}
                isDisabled={name.trim().length === 0 || key.trim().length === 0}
                className="w-full mt-2 sm:ml-3 sm:mt-0 sm:w-auto mb-2 sm:mb-0"
                onClick={handleAction}
              >
                Create
              </Button>

              <Button className="w-full sm:w-auto" onClick={() => onClose()}>
                Cancel
              </Button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default CreateTemplatetModal;
