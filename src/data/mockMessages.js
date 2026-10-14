import { ROLE_AGENT } from '../chat/types.js';
import {
  AGENT_NAME,
  AGENT_TITLE,
  BEAUTY_CENTER_PHONE,
  SHOP_NAME,
} from '../../shared/beautyCenter.js';

/** @type {import('../chat/types.js').ChatMessage[]} */
export const initialMessages = [
  {
    id: 'msg-welcome-1',
    role: ROLE_AGENT,
    text: `Здравствуйте! Я ${AGENT_NAME}, ${AGENT_TITLE} магазина «${SHOP_NAME}». Помогу подобрать уход и декоративную косметику, объясню состав и способ применения.`,
    createdAt: Date.now() - 120_000,
  },
  {
    id: 'msg-welcome-2',
    role: ROLE_AGENT,
    text: `По доставке, заказам и другим организационным вопросам звоните в центр красоты: ${BEAUTY_CENTER_PHONE}.`,
    createdAt: Date.now() - 90_000,
  },
];

export const quickReplySuggestions = [
  'Крем для сухой и чувствительной кожи',
  'Можно ли сочетать витамин C и SPF утром?',
  'Чем сыворотка отличается от эссенции?',
  'Как выбрать тональное средство?',
];
