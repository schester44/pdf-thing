import { isSettingsPanelCollapsed } from "@client/components/Editor/recoil/selectors";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useRecoilState } from "recoil";

type Props = {
  title: string;
};

export const CollapsiblePanel: React.FC<Props> = ({ title, children }) => {
  const [isCollapsed, setCollapsed] = useRecoilState(isSettingsPanelCollapsed(title));

  return (
    <div>
      <div
        className="cursor-pointer bg-gray-800  flex items-center p-2 text-sm text-white"
        onClick={() => {
          setCollapsed(!isCollapsed);
        }}
      >
        <span className="pr-2">{!isCollapsed ? <FiChevronRight /> : <FiChevronDown />}</span>
        <span>{title}</span>
      </div>

      {isCollapsed && <div>{children}</div>}
    </div>
  );
};
