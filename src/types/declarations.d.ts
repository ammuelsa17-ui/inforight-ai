declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }

  export type LucideIcon = React.ComponentType<LucideProps>;

  export const Activity: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const AlertOctagon: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Bookmark: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const ClipboardList: LucideIcon;
  export const Clock: LucideIcon;
  export const Copy: LucideIcon;
  export const Download: LucideIcon;
  export const Edit3: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const FileText: LucideIcon;
  export const FileUp: LucideIcon;
  export const Filter: LucideIcon;
  export const FolderOpen: LucideIcon;
  export const Globe: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const Heart: LucideIcon;
  export const HeartHandshake: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const Home: LucideIcon;
  export const Inbox: LucideIcon;
  export const Info: LucideIcon;
  export const LayoutDashboard: LucideIcon;
  export const Loader2: LucideIcon;
  export const Lock: LucideIcon;
  export const MapPin: LucideIcon;
  export const Menu: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const MessageSquarePlus: LucideIcon;
  export const Mic: LucideIcon;
  export const MicOff: LucideIcon;
  export const Phone: LucideIcon;
  export const Plus: LucideIcon;
  export const Printer: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const Save: LucideIcon;
  export const Scale: LucideIcon;
  export const Search: LucideIcon;
  export const Settings: LucideIcon;
  export const Shield: LucideIcon;
  export const ShieldAlert: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const UploadCloud: LucideIcon;
  export const User: LucideIcon;
  export const UserCheck: LucideIcon;
  export const Users: LucideIcon;
  export const X: LucideIcon;
}
