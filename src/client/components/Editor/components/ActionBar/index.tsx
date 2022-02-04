import React from "react";
import Link from "next/link";
import Button from "@client/components/dashboard/Button";
import { useSaveTemplateMutation } from "@client/graphql/types.generated";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { documentState } from "../../recoil/atoms";
import { useGetTemplate } from "../../recoil/hooks/useGetTemplate";

export const ActionBar = () => {
  const template = useRecoilValue(documentState);

  const [, saveTemplate] = useSaveTemplateMutation();
  const getTemplate = useGetTemplate();

  const handleSave = async () => {
    const template = getTemplate();

    await saveTemplate({
      id: template.id,
      name: template.name,
      key: template.key,
      data: {
        nodes: template.nodes,
        pageIds: template.pageIds,
        nodeIds: template.nodeIds,
      },
    });
  };

  return (
    <div className=" bg-white px-4 py-3 border-b">
      <div className="h-full w-full flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/templates">
            <Button className="mr-4">
              <FiArrowLeft />
            </Button>
          </Link>

          <div>
            <h1 className="text-md text-gray-800 font-medium">{template.name}</h1>
            <h4 className="text-xs text-gray-400">{template.key}</h4>
          </div>
        </div>

        <div className="flex">
          <Button size="sm" className="flex items-center mr-2 bg-white hover:bg-gray-100">
            Preview
          </Button>

          <Button size="sm" type="primary" className="flex items-center" onClick={handleSave}>
            Save
            <FiSave className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
