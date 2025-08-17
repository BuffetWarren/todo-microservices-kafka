export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

// Utilitaires pour l'enum Priority
export const PriorityOrder = {
  [Priority.LOW]: 1,
  [Priority.MEDIUM]: 2,
  [Priority.HIGH]: 3,
} as const;

export const PriorityLabels = {
  [Priority.LOW]: 'Faible',
  [Priority.MEDIUM]: 'Moyen',
  [Priority.HIGH]: 'Élevé',
} as const;