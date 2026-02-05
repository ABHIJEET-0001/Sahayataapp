interface CategoryButtonProps {
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryButton({ name, icon, isActive, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{name}</span>
    </button>
  );
}
