"use client";

export default function WorkspaceContextMenu({
    x,
    y,
    onEdit,
    onDelete,
}: {
    x: number;
    y: number;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div
            className="fixed bg-[#1e1e1e] border border-gray-700 rounded-md shadow-xl p-2 z-[9999] w-40"
            style={{
                top: y,
                left: x,
            }}
        >
            <button
                className="w-full text-left px-3 py-2 hover:bg-gray-700 text-white rounded"
                onClick={onEdit}
            >
                Edit Workspace
            </button>

            <button
                className="w-full text-left px-3 py-2 hover:bg-red-700 text-white rounded"
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    );
}
