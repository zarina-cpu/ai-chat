/** @param {string} text */
export function normalizeUserText(text) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[!?.…,]+$/g, '');
}

const GREETING_EXACT = new Set([
  'привет',
  'приветик',
  'здравствуйте',
  'здравствуй',
  'добрый день',
  'доброе утро',
  'добрый вечер',
  'hi',
  'hello',
  'hey',
  'салют',
  'хай',
]);

/** @param {string} normalized */
export function isGreeting(normalized) {
  if (GREETING_EXACT.has(normalized)) return true;
  if (normalized.startsWith('привет') && normalized.length <= 16) return true;
  if (normalized.startsWith('здравствуй')) return true;
  if (/^как дела/.test(normalized) || /^вы тут/.test(normalized)) return true;
  return false;
}

/** @param {string} normalized */
export function isThanks(normalized) {
  return /^(спасибо|благодарю|thanks|thank you|спс)([\s,.]|$)/.test(normalized);
}

const servicePatterns =
  /доставк|оформ.*заказ|оплат|возврат|жалоб|курьер|трек|номер заказ|скидк|промокод|акци|график работ|адрес магазин|где вы наход|как доехать|не работает сайт|логист/i;

const catalogPatterns =
  /наличи|в наличии|ассортимент|каталог|какие товар|что есть|что прода|что у вас|есть ли|остатк|sku|прайс|цена/i;

const salonPatterns = /запис|салон|стрижк|маникюр|массаж|процедур|мастер/i;

const medicalPatterns =
  /диагноз|лечени|беремен|лактац|таблетк|антибиотик|врач|дерматолог.*очн/i;

const cosmeticPatterns =
  /крем|сыворот|эссенц|тоник|spf|солнц|загар|кислот|ретinol|ретинол|витамин|уход|кож[аеиу]|лиц[оа]|макияж|тональн|пудр|помад|тен[и]|тушь|консилер|bb|cc|пилинг|скраб|очищен|умыван|гидрофил|шампун|бальзам|волос|тел[оа]|увлажн|жирн|сух|комби|чувствит|пигмент|акне|комедон|компонент|состав|niacin|ниacin|ниацин|церамid|гиалурон|peptide|пептид|подобра|посовет|что лучше|чем отлича/i;

/**
 * @param {string} text
 * @returns {'empty'|'greeting'|'thanks'|'catalog'|'service'|'salon'|'medical'|'cosmetic'|'clarify'|'offtopic'}
 */
export function classifyMessage(text) {
  const trimmed = text.trim();
  const normalized = normalizeUserText(text);

  if (!trimmed) return 'empty';
  if (isGreeting(normalized)) return 'greeting';
  if (isThanks(normalized)) return 'thanks';
  if (catalogPatterns.test(normalized)) return 'catalog';
  if (servicePatterns.test(normalized)) return 'service';
  if (salonPatterns.test(normalized)) return 'salon';
  if (medicalPatterns.test(normalized)) return 'medical';
  if (cosmeticPatterns.test(normalized)) return 'cosmetic';
  if (trimmed.length <= 48) return 'clarify';
  return 'offtopic';
}
