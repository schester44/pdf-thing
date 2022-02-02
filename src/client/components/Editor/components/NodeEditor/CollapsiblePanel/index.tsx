import { isSettingsPanelCollapsed } from "@client/components/Editor/recoil/selectors";
import { FiChevronDown, FiChevronRight, FiChevronUp } from "react-icons/fi";
import { useRecoilState } from "recoil";

type Props = {
  title: string;
};

export const CollapsiblePanel: React.FC<Props> = ({ title, children }) => {
  const [isCollapsed, setCollapsed] = useRecoilState(isSettingsPanelCollapsed(title));

  return (
    <div>
      <div
        className="cursor-pointer flex items-center justify-between py-2 px-4 text-sm "
        onClick={() => {
          setCollapsed(!isCollapsed);
        }}
      >
        <span className="text-gray-800 text-md font-medium">{title}</span>

        <span className="pr-2 text-gray-400 hover:text-gray-900 transition-colors">
          {isCollapsed ? (
            <FiChevronDown className="text-lg" />
          ) : (
            <FiChevronUp className="text-lg" />
          )}
        </span>
      </div>

      {!isCollapsed && <div>{children}</div>}

      <div className={`px-2 ${isCollapsed ? "py-2" : "pt-4 pb-2"}`}>
        <div className="w-full bg-gray-200 rounded-lg" style={{ height: 2 }} />
      </div>
    </div>
  );
};
