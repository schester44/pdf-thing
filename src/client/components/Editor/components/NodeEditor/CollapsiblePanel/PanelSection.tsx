type Props = {
  title: string;
};

export const PanelSection: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="p-3 border-t border-gray-50">
      <div className="pb-2 text-xs uppercase text-gray-400 tracking-widest">{title}</div>
      <div>{children}</div>
    </div>
  );
};
