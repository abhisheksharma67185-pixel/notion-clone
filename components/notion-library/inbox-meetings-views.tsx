"use client";

import { toast } from "sonner";
import {
  Inbox,
  AtSign,
  MessageSquare,
  UserPlus,
  Clock,
  Settings2,
  Plus,
  Video,
  Mic,
  FileAudio,
  Calendar,
} from "lucide-react";

type OpenDoc = { title: string; kind: "meeting" | "page" | "database"; heading?: string };

function Avatar({ name, color = "#E28026", className = "h-6 w-6 text-[11px]" }: { name: string; color?: string; className?: string }) {
  return (
    <span
      className={"flex shrink-0 items-center justify-center rounded-full font-semibold text-white " + className}
      style={{ backgroundColor: color }}
    >
      {name[0]}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Inbox                                                               */
/* ------------------------------------------------------------------ */

type Notification = {
  id: string;
  actor: string;
  color: string;
  icon: React.ReactNode;
  text: React.ReactNode;
  time: string;
  group: "Today" | "Earlier";
  open?: OpenDoc;
  unread?: boolean;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    actor: "Abhishek Sharma",
    color: "#E28026",
    icon: <MessageSquare className="h-3.5 w-3.5 text-[#2383E2]" strokeWidth={2} />,
    text: (<>commented on <strong className="font-semibold">Welcome to Notion</strong></>),
    time: "2h ago",
    group: "Today",
    open: { title: "Welcome to Notion", kind: "page" },
    unread: true,
  },
  {
    id: "n2",
    actor: "Alex Morgan",
    color: "#3B82D0",
    icon: <AtSign className="h-3.5 w-3.5 text-[#448361]" strokeWidth={2} />,
    text: (<>mentioned you in <strong className="font-semibold">New page</strong></>),
    time: "5h ago",
    group: "Today",
    open: { title: "New page", kind: "page" },
    unread: true,
  },
  {
    id: "n3",
    actor: "Abhishek Sharma",
    color: "#E28026",
    icon: <UserPlus className="h-3.5 w-3.5 text-[#9A6DD7]" strokeWidth={2} />,
    text: (<>shared <strong className="font-semibold">To Do List</strong> with you</>),
    time: "1d ago",
    group: "Earlier",
    open: { title: "To Do List", kind: "page" },
  },
  {
    id: "n4",
    actor: "Notion Calendar",
    color: "#5A9BD8",
    icon: <Clock className="h-3.5 w-3.5 text-[#D9730D]" strokeWidth={2} />,
    text: (<>Reminder: <strong className="font-semibold">Project check-in</strong> starts soon</>),
    time: "2d ago",
    group: "Earlier",
    open: { title: "@Today 4:07 AM", kind: "meeting", heading: "Meeting @Today" },
  },
];

export function InboxView({ onOpenDoc }: { onOpenDoc: (doc: OpenDoc) => void }) {
  const groups: Notification["group"][] = ["Today", "Earlier"];

  return (
    <main className="flex h-dvh flex-1 flex-col overflow-y-auto bg-white text-[#2C2C2B]">
      {/* Header */}
      <div className="flex h-11 shrink-0 items-center justify-between px-4">
        <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#37352F]">
          <Inbox className="h-4 w-4 text-[#5F5E59]" strokeWidth={1.9} />
          Inbox
        </div>
        <div className="flex items-center gap-1 text-[#5F5E59]">
          <button onClick={() => toast("Marked all as read")} className="h-7 rounded-md px-2.5 text-[13px] hover:bg-black/[0.04]">
            Mark all as read
          </button>
          <button onClick={() => toast("Inbox settings")} aria-label="Inbox settings" className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-black/[0.04]">
            <Settings2 className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[720px] px-6 pt-6">
        <h1 className="mb-1 text-[30px] font-bold text-[#2C2C2B]">Inbox</h1>
        <p className="mb-6 text-[14px] text-[#7D7A75]">Updates, mentions, and comments across your workspace.</p>

        {groups.map((g) => {
          const items = NOTIFICATIONS.filter((n) => n.group === g);
          if (items.length === 0) return null;
          return (
            <div key={g} className="mb-6">
              <div className="mb-1 px-1 text-[12px] font-semibold uppercase tracking-wide text-[#9B9A97]">{g}</div>
              <div className="flex flex-col">
                {items.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => n.open && onOpenDoc(n.open)}
                    className="group flex items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-black/[0.03]"
                  >
                    <div className="relative shrink-0">
                      <Avatar name={n.actor} color={n.color} />
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-[0_0_0_1.5px_white]">
                        {n.icon}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] text-[#37352F]">
                        <strong className="font-semibold">{n.actor}</strong> {n.text}
                      </div>
                      <div className="text-[12px] text-[#9B9A97]">{n.time}</div>
                    </div>
                    {n.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-[#2383E2]" />}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Meetings                                                            */
/* ------------------------------------------------------------------ */

export function MeetingsView({ onOpenDoc }: { onOpenDoc: (doc: OpenDoc) => void }) {
  return (
    <main className="flex h-dvh flex-1 flex-col overflow-y-auto bg-white text-[#2C2C2B]">
      {/* Header */}
      <div className="flex h-11 shrink-0 items-center justify-between px-4">
        <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#37352F]">
          <FileAudio className="h-4 w-4 text-[#5F5E59]" strokeWidth={1.9} />
          Meetings
        </div>
        <button
          onClick={() => toast.success("Created a new AI meeting note")}
          className="flex h-7 items-center gap-1.5 rounded-md bg-[#2383E2] px-2.5 text-[13px] font-medium text-white hover:bg-[#1a73d0]"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          New meeting notes
        </button>
      </div>

      <div className="mx-auto w-full max-w-[820px] px-6 pt-6">
        <h1 className="mb-1 text-[30px] font-bold text-[#2C2C2B]">Meetings</h1>
        <p className="mb-6 text-[14px] text-[#7D7A75]">Join calls, transcribe audio, and keep every meeting note in one place.</p>

        {/* Upcoming */}
        <div className="mb-3 px-1 text-[12px] font-semibold uppercase tracking-wide text-[#9B9A97]">Upcoming</div>
        <div className="mb-8 flex flex-col gap-2">
          <MeetingRow
            title="Team standup"
            when="Today · 9:00 AM"
            where="Office"
            attendees={["Alex Morgan", "Abhishek Sharma"]}
            action="Join and take notes"
            onAction={() => toast("Joining Team standup…")}
          />
          <MeetingRow
            title="Project check-in"
            when="Sun, Jul 12 · 10:00 AM"
            where="Office"
            attendees={["Alex Morgan", "Abhishek Sharma"]}
            action="Join and take notes"
            onAction={() => toast("Joining Project check-in…")}
          />
        </div>

        {/* Recent notes */}
        <div className="mb-3 px-1 text-[12px] font-semibold uppercase tracking-wide text-[#9B9A97]">Recent notes</div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onOpenDoc({ title: "@Today 4:07 AM", kind: "meeting", heading: "Meeting @Today" })}
            className="flex items-center gap-3 rounded-xl border border-black/[0.08] bg-white p-3.5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FB] text-[#2383E2]">
              <Mic className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-medium text-[#2C2C2B]">Meeting @Today</div>
              <div className="text-[13px] text-[#7D7A75]">Notes · Transcript · AI summary · 2h ago</div>
            </div>
            <span className="text-[13px] text-[#9B9A97]">Alex Morgan</span>
          </button>
        </div>

        {/* Connect calendar promo */}
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-black/[0.08] bg-[#FBFAF9] p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-[#5F5E59]">
            <Calendar className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-semibold text-[#2C2C2B]">Connect your calendar</div>
            <div className="mt-0.5 text-[13px] text-[#7D7A75]">Automatically create meeting notes for your calendar events.</div>
          </div>
          <button
            onClick={() => toast("Connecting calendar…")}
            className="flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-[#2383E2] px-3 text-[13px] font-medium text-white hover:bg-[#1a73d0]"
          >
            <Video className="h-3.5 w-3.5" strokeWidth={2} />
            Connect
          </button>
        </div>
      </div>
    </main>
  );
}

function MeetingRow({
  title,
  when,
  where,
  attendees,
  action,
  onAction,
}: {
  title: string;
  when: string;
  where: string;
  attendees: string[];
  action: string;
  onAction: () => void;
}) {
  const colors = ["#E28026", "#3B82D0", "#9A6DD7", "#4F9768"];
  return (
    <div className="flex items-center gap-3 rounded-xl border border-black/[0.08] bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F1F0EE] text-[#5F5E59]">
        <Calendar className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-medium text-[#2C2C2B]">{title}</div>
        <div className="text-[13px] text-[#7D7A75]">{when} · {where}</div>
      </div>
      <div className="flex -space-x-1.5">
        {attendees.map((a, i) => (
          <Avatar key={a} name={a} color={colors[i % colors.length]} className="h-6 w-6 text-[10px] ring-2 ring-white" />
        ))}
      </div>
      <button
        onClick={onAction}
        className="flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-black/[0.04] px-3 text-[13px] font-medium text-[#37352F] hover:bg-black/[0.08]"
      >
        <Video className="h-3.5 w-3.5" strokeWidth={2} />
        {action}
      </button>
    </div>
  );
}

// Silence unused-import lint if any icon is trimmed later.
