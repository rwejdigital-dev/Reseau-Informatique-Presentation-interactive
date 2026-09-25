import type { LucideIcon } from 'lucide-react';
import { Cable, FileKey2, Globe2, LockKeyhole, Network, Router, Server, ShieldCheck, Wifi } from 'lucide-react';

export type ChapterId = 'depart' | 'territoires' | 'infrastructure' | 'conversation' | 'confiance';

export type Chapter = {
  id: ChapterId;
  path: string;
  number: string;
  label: string;
  title: string;
  kicker: string;
};

export const chapters: Chapter[] = [
  { id: 'depart', path: '/', number: '01', label: 'PRÉSENTATION', title: 'Comprendre l’invisible', kicker: 'Les réseaux informatiques' },
  { id: 'territoires', path: '/territoires', number: '02', label: 'LES TERRITOIRES', title: 'Des réseaux à plusieurs échelles', kicker: 'Géographie de la connexion' },
  { id: 'infrastructure', path: '/infrastructure', number: '03', label: 'INFRASTRUCTURE', title: 'Les gestes du réseau', kicker: 'Équipements et supports' },
  { id: 'conversation', path: '/conversation', number: '04', label: 'LA CONVERSATION', title: 'Client, serveur, dialogue', kicker: 'Le web en mouvement' },
  { id: 'confiance', path: '/confiance', number: '05', label: 'LA CONFIANCE', title: 'Relier, mais protéger', kicker: 'Sécurité des échanges' },
];

export type Territory = {
  code: string;
  title: string;
  scale: string;
  description: string;
  example: string;
  accent: string;
};

export const territories: Territory[] = [
  { code: 'LAN', title: 'Réseau local', scale: 'un logement, un bureau, un campus', description: 'Un LAN relie des équipements proches dans une zone géographique limitée.', example: 'Les ordinateurs, imprimantes et bornes Wi-Fi d’un campus partagent le même réseau local.', accent: 'coral' },
  { code: 'MAN', title: 'Réseau métropolitain', scale: 'une agglomération', description: 'Un MAN interconnecte plusieurs réseaux locaux répartis dans une même ville ou métropole.', example: 'Des bâtiments universitaires reliés par une boucle métropolitaine à haut débit.', accent: 'mint' },
  { code: 'WAN', title: 'Réseau étendu', scale: 'un pays à plusieurs continents', description: 'Un WAN relie des réseaux distants grâce à des opérateurs et des liaisons interurbaines.', example: 'Internet est le plus vaste exemple public de réseau étendu.', accent: 'blue' },
];

export type HardwareItem = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  detail: string;
  Icon: LucideIcon;
};

export const hardware: HardwareItem[] = [
  { id: 'routeur', title: 'Routeur', eyebrow: 'décide', description: 'Examine les adresses IP et choisit le prochain saut pour un paquet.', detail: 'Interconnecte des réseaux IP distincts.', Icon: Router },
  { id: 'commutateur', title: 'Commutateur', eyebrow: 'distribue', description: 'Apprend les adresses MAC et achemine chaque trame vers le bon port.', detail: 'Connecte les équipements d’un même réseau local.', Icon: Network },
  { id: 'fibre', title: 'Fibre optique', eyebrow: 'transporte', description: 'Transmet les données sous forme d’impulsions lumineuses sur de longues distances.', detail: 'Débit élevé, faible atténuation, installation spécialisée.', Icon: Cable },
  { id: 'ethernet-wifi', title: 'Ethernet et Wi-Fi', eyebrow: 'relie', description: 'Ethernet utilise un câble ; le Wi-Fi utilise des ondes radio pour le dernier lien.', detail: 'Deux accès différents vers le même réseau local.', Icon: Wifi },
];

export const flowSteps = [
  { id: 'ip', number: '01', label: 'IP', title: 'Identifier la destination', description: 'Une adresse IP identifie une interface réseau et permet aux routeurs d’acheminer les paquets.', Icon: Globe2 },
  { id: 'dns', number: '02', label: 'DNS', title: 'Résoudre le nom', description: 'Le DNS associe un nom de domaine à des enregistrements, notamment des adresses IP.', Icon: Network },
  { id: 'http', number: '03', label: 'HTTP(S)', title: 'Échanger en sécurité', description: 'HTTP décrit la requête et la réponse ; HTTPS ajoute le chiffrement TLS et l’authentification du serveur.', Icon: FileKey2 },
];

export const securityPrinciples = [
  { id: 'tls', title: 'Chiffrement TLS', description: 'TLS, qui a remplacé le protocole SSL désormais obsolète, protège la confidentialité et l’intégrité des données échangées.', Icon: LockKeyhole },
  { id: 'firewall', title: 'Pare-feu', description: 'Filtre le trafic selon des règles : ports, adresses, protocoles ou contexte de connexion.', Icon: ShieldCheck },
  { id: 'application', title: 'Protection applicative', description: 'Mises à jour, authentification multifacteur, validation des entrées et moindre privilège réduisent les risques.', Icon: Server },
];