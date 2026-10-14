import { classifyMessage } from '../../shared/messageIntent.js';
import { formatCatalogReply } from '../../shared/mockCatalog.js';
import {
  AGENT_NAME,
  clarifyReply,
  greetingReply,
  redirectToBeautyCenter,
} from '../../shared/beautyCenter.js';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const cosmeticPools = {
  drySkin: [
    'Для сухой кожи ищите крем с церамидами, скваланом и гиалуроновой кислотой. Утром — лёгкий крем + SPF, вечером — плотнее текстура.',
    'Сухой тип любит барьерные формулы: пантенол, шиповник, масло ши в составе. Избегайте агрессивных ПАВ в умывании.',
  ],
  actives: [
    'Витамин C и SPF утром сочетаются отлично. Наносите сыворотку с C на сухую кожу, затем крем и SPF 30+.',
    'Ретinol и кислоты лучше чередовать по дням, чтобы не раздражать барьер кожи.',
  ],
  routine: [
    'Базовый уход: очищение → тоник/эссенция → сыворотка → крем → SPF (утром).',
    'Сыворотка — активы под задачу, эссенция — лёгкое увлажнение. Можно использовать обе.',
  ],
  makeup: [
    'Тон подбирайте по типу кожи и тестируйте на линии челюсти при дневном свете.',
    'Для лёгкого покрытия — тональный флюид и точечный консилер.',
  ],
  spf: [
    'SPF — финальный шаг утреннего ухода. Обновляйте каждые 2–3 часа при активном солнце.',
  ],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function matchCosmeticPool(text) {
  const lower = text.toLowerCase();
  if (/spf|солнц|защит.*луч/.test(lower)) return cosmeticPools.spf;
  if (/тональн|макияж|помад|пудр|консилер/.test(lower)) return cosmeticPools.makeup;
  if (/витамин|ретinol|ретинол|кислот|актив|совмест/.test(lower)) return cosmeticPools.actives;
  if (/сыворот|эссенц|порядок|рутин|слой|утро|вечер/.test(lower)) return cosmeticPools.routine;
  if (/сух|чувствит|увлажн|крем/.test(lower)) return cosmeticPools.drySkin;
  return [...cosmeticPools.routine, ...cosmeticPools.drySkin];
}

/**
 * @param {string} userText
 * @param {import('./types.js').ChatMessage[]} _history
 */
export function getMockReply(userText, _history) {
  switch (classifyMessage(userText)) {
    case 'greeting':
      return greetingReply();
    case 'thanks':
      return `Пожалуйста! Если понадобится ещё совет по уходу или косметике — я на связи, ${AGENT_NAME}.`;
    case 'catalog':
      return formatCatalogReply();
    case 'service':
      return redirectToBeautyCenter('доставки, оплаты и заказов');
    case 'salon':
      return redirectToBeautyCenter('записи и процедур в салоне');
    case 'medical':
      return `По медицинским вопросам лучше обратиться к врачу. Я могу подсказать только общие сведения по косметическому уходу — опишите тип кожи и задачу.`;
    case 'cosmetic':
      return pickRandom(matchCosmeticPool(userText));
    case 'empty':
    case 'clarify':
      return clarifyReply();
    case 'offtopic':
    default:
      return redirectToBeautyCenter('этой темы');
  }
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomTypingMs() {
  return 800 + Math.floor(Math.random() * 1200);
}

/**
 * @param {(typing: boolean) => void} onTypingChange
 * @param {string} userText
 * @param {import('./types.js').ChatMessage[]} history
 */
export async function simulateAgentReply(onTypingChange, userText, history) {
  const replyText = getMockReply(userText, history);
  onTypingChange(true);
  await delay(randomTypingMs());
  onTypingChange(false);
  return replyText;
}
