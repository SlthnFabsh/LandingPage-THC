import type { ComponentType } from 'react';
import {
  Activity,
  ArrowLeftRight,
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Cable,
  Cloud,
  Clock4,
  Cpu,
  Database,
  Eye,
  GitBranch,
  Globe,
  GraduationCap,
  Hotel,
  Layers,
  LayoutDashboard,
  Leaf,
  Lock,
  MapPin,
  Network,
  PiggyBank,
  Radio,
  Router,
  Server,
  ServerCog,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
  Zap,
} from 'lucide-react';

export type ServiceIconName =
  | 'Activity'
  | 'ArrowLeftRight'
  | 'ArrowRight'
  | 'BadgeDollarSign'
  | 'Building2'
  | 'Cable'
  | 'Cloud'
  | 'Clock4'
  | 'Cpu'
  | 'Database'
  | 'Eye'
  | 'GitBranch'
  | 'Globe'
  | 'GraduationCap'
  | 'Hotel'
  | 'Layers'
  | 'LayoutDashboard'
  | 'Leaf'
  | 'Lock'
  | 'MapPin'
  | 'Network'
  | 'PiggyBank'
  | 'Radio'
  | 'Router'
  | 'Server'
  | 'ServerCog'
  | 'Share2'
  | 'ShieldCheck'
  | 'Smartphone'
  | 'Sparkles'
  | 'Wifi'
  | 'Zap';

type IconComponent = ComponentType<{ className?: string }>;

const registry: Record<ServiceIconName, IconComponent> = {
  Activity,
  ArrowLeftRight,
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Cable,
  Cloud,
  Clock4,
  Cpu,
  Database,
  Eye,
  GitBranch,
  Globe,
  GraduationCap,
  Hotel,
  Layers,
  LayoutDashboard,
  Leaf,
  Lock,
  MapPin,
  Network,
  PiggyBank,
  Radio,
  Router,
  Server,
  ServerCog,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
  Zap,
};

export const serviceIconNames = Object.keys(registry) as ServiceIconName[];

export const DEFAULT_SERVICE_ICON: ServiceIconName = 'Layers';

export function isServiceIconName(value: string): value is ServiceIconName {
  return Object.prototype.hasOwnProperty.call(registry, value);
}

export function getServiceIcon(name?: string | null): IconComponent {
  if (!name || !isServiceIconName(name)) return registry[DEFAULT_SERVICE_ICON];
  return registry[name];
}
