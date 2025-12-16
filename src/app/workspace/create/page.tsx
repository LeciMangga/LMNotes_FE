"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import { User, Users, Plus, X } from "lucide-react";
import Image from "next/image";
import { getUserbyEmail } from "@/lib/auth";

import { createWorkspace } from "@/lib/workspace";

type Member = {
  name: string;
  email: string;
};

export default function CreateWorkspacePage() {
  const session = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isAddingMemberLoading, setIsAddingMemberLoading] = useState(false);


  const addMember = async () => {
    setIsAddingMemberLoading(true);
    if (!newMemberEmail.trim()) return;
    const user = await getUserbyEmail(newMemberEmail);
    if (user) {
      setMembers([...members, { name: user.name, email: user.email }]);
      setNewMemberEmail("");
    } else {
      alert("User not found");
    }
    setIsAddingMemberLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitLoading(true);
    e.preventDefault();

    const resp =  await createWorkspace(title, description, members.map(m => m.email));

    if (resp) {
      window.dispatchEvent(new Event("refresh-workspace"));
      router.push(`/${resp.workspace_id}/createPage`);
    } else {
      alert("Failed to create workspace");
    }
    setIsSubmitLoading(false);
  };

  return (
    <div className="h-full w-full bg-[#2c2c2c] text-white px-10 py-8 overflow-auto">
      <div className="flex items-center gap-3 mb-8">
        <Users size={28} />
        <h1 className="text-3xl font-semibold">New Workspace</h1>
      </div>
      <div className="max-w-xl flex flex-col gap-6">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-lg">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="mt-1 w-full px-3 py-2 rounded-md bg-[#f0f0f0] text-black outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg">Description</label>
            <input
              type="text"
              placeholder="Description"
              className="mt-1 w-full px-3 py-2 rounded-md bg-[#f0f0f0] text-black outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg">Owner</label>
            <div className="flex items-center justify-between bg-[#3a3a3a] px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                      {session.data?.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{session.data?.user?.email}</p>
                    </div>
                  </div>
              </div>
          </div>
          <div>
            <label className="text-lg">Max Member</label>
            <div className="flex items-center gap-3 mt-2">
              <Users size={22} />
              <span className="text-xl">5</span>
            </div>
          </div>
          <div>
            <label className="text-lg">Members</label>
            <div className="flex flex-col gap-2 mt-3">
              {members.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-[#3a3a3a] px-4 py-2 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.email}</p>
                    </div>
                  </div>

                  <button
                    className="text-gray-300 hover:text-red-400"
                    onClick={() =>
                      setMembers(members.filter((_, i) => i !== idx))
                    }
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <input
                type="text"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 rounded-md bg-[#f0f0f0] text-black outline-none"
              />
              {isAddingMemberLoading ? (
                <div className="flex items-center justify-center h-10">
                  <div className="h-10 w-10 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin text-gray-700"></div>
                </div>
              ) : (
                <button
                  onClick={addMember}
                  disabled={members.length >= 5 || isAddingMemberLoading}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
                >
                  <Plus size={18} />
                  add member
                </button>
              )}
              
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            {isSubmitLoading ? (
              <div className="flex items-center justify-center h-10">
                  <div className="h-10 w-10 border-4 border-t-4 border-gray-500 border-t-transparent rounded-full animate-spin text-gray-700"></div>
              </div>
            ): (
              <button disabled={isSubmitLoading} type="submit" className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold">
              Create Workspace
            </button>
            )}
            
            <button type="button" className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
