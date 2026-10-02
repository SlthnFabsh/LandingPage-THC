import type { ComponentType } from 'react';
import InternetServices from '@/components/Services/InternetServices';
import IPTransitDetail from '@/components/Services/IPTransitDetail';
import DedicatedInternetDetail from '@/components/Services/DedicatedInternetDetail';
import ThcIxDetial from '@/components/Services/ThcIxDetial';
import ConnectivityServices from '@/components/Services/ConnectivityServices';
import IplcDetail from '@/components/Services/IplcDetail';
import IeplDetail from '@/components/Services/IeplDetail';
import MetroEthernetDetail from '@/components/Services/MetroEthernetDetail';
import IdcbDetail from '@/components/Services/IdcbDetail';
import DataCenterServices from '@/components/Services/DataCenterServices';
import ColocationServerDetail from '@/components/Services/ColocationServerDetail';
import ThcCloudDetail from '@/components/Services/ThcCloudDetail';
import ManagedServices from '@/components/Services/ManagedServices';
import ManagedCpeDetail from '@/components/Services/ManagedCpeDetail';
import ManagedWifiDetail from '@/components/Services/ManagedWifiDetail';
import ManagedSolutions from '@/components/Services/ManagedSolutions';
import HospitalitySolutions from '@/components/Services/HospitalitySolutions';
import EducationSolutions from '@/components/Services/EducationSolutions';

/**
 * Jaring pengaman: bila halaman /layanan/<slug> belum memiliki baris di
 * ServicePage, isi halaman dirender dari komponen lama yang masih hardcoded.
 * Dengan begitu production tidak akan pernah 404 walaupun seeding belum
 * dilakukan, dan cukup mengosongkan tabel untuk kembali ke konten lama.
 */
export const legacyServiceComponents: Record<string, ComponentType> = {
  internet: InternetServices,
  'internet/ip-transit': IPTransitDetail,
  'internet/dedicated-internet': DedicatedInternetDetail,
  'internet/thc-ix': ThcIxDetial,
  konektivitas: ConnectivityServices,
  'konektivitas/iplc': IplcDetail,
  'konektivitas/iepl': IeplDetail,
  'konektivitas/metro-ethernet': MetroEthernetDetail,
  'konektivitas/idcb': IdcbDetail,
  'pusat-data': DataCenterServices,
  'pusat-data/colocation': ColocationServerDetail,
  'pusat-data/thc-cloud': ThcCloudDetail,
  'solusi/layanan-terkelola': ManagedServices,
  'solusi/layanan-terkelola/managed-cpe': ManagedCpeDetail,
  'solusi/layanan-terkelola/managed-wifi': ManagedWifiDetail,
  'solusi/solusi-terkelola': ManagedSolutions,
  'solusi/solusi-terkelola/hospitality-solutions': HospitalitySolutions,
  'solusi/solusi-terkelola/education-solutions': EducationSolutions,
};
