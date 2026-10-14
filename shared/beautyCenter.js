export const SHOP_NAME = 'Lumière Beauty';
export const BEAUTY_CENTER_NAME = 'центра красоты «Lumière»';
export const BEAUTY_CENTER_PHONE = '8 (800) 555-12-34';
export const BEAUTY_CENTER_PHONE_RAW = '88005551234';

export const AGENT_NAME = 'Алина';
export const AGENT_TITLE = 'консультант по косметике';

export function redirectToBeautyCenter(reason = 'доставки, заказов и сервиса') {
  return `Я консультирую только по косметике и уходу. По вопросам ${reason} позвоните в ${BEAUTY_CENTER_NAME}: ${BEAUTY_CENTER_PHONE} (бесплатно по России, ежедневно 10:00–21:00).`;
}

export function greetingReply() {
  return `Здравствуйте! Я ${AGENT_NAME}, ${AGENT_TITLE} «${SHOP_NAME}». Расскажите, какой уход или продукт вас интересует — тип кожи, сыворотка, SPF или макияж?`;
}

export function clarifyReply() {
  return `Могу подсказать по уходу, составу и применению косметики. Например: крем для вашего типа кожи, сочетание активов или выбор SPF. Что хотите уточнить?`;
}
