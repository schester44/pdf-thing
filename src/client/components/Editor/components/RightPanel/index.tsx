import Button from "@client/components/dashboard/Button";
import { useSaveTemplateMutation } from "@client/graphql/types.generated";
import { FiSave } from "react-icons/fi";
import { useGetTemplate } from "../../recoil/hooks/useGetTemplate";
import { NodeEditor } from "../NodeEditor";

export const RightPanel = () => {
  const [, saveTemplate] = useSaveTemplateMutation();
  const getTemplate = useGetTemplate();

  const handleSave = async () => {
    const template = getTemplate();

    console.log("template", template);

    const x = await saveTemplate({
      id: template.id,
      name: template.name,
      key: template.key,
      data: {
        nodes: template.nodes,
        pageIds: template.pageIds,
        nodeIds: template.nodeIds,
      },
    });

    console.log({ x });
  };

  return (
    <div className="w-1/4 bg-white h-full flex flex-col">
      <div className="flex justify-end p-2">
        <Button size="sm" type="primary" className="flex items-center" onClick={handleSave}>
          Save
          <FiSave className="ml-2" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <NodeEditor />
      </div>
    </div>
  );
};
