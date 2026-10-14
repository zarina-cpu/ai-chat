import { ChatWidget } from './components/ChatWidget/ChatWidget.jsx';
import { BEAUTY_CENTER_PHONE, SHOP_NAME } from '../shared/beautyCenter.js';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.badge}>Демо-страница</p>
        <h1 className={styles.title}>Магазин косметики «{SHOP_NAME}»</h1>
        <p className={styles.lead}>
          Виджет чата в правом нижнем углу — как у Jivo. Консультант отвечает на вопросы
          по уходу и косметике; по заказам и сервису — телефон центра красоты {BEAUTY_CENTER_PHONE}.
        </p>
        <ul className={styles.features}>
          <li>Консультации по косметике через Gemini на backend</li>
          <li>Светлая и тёмная тема с сохранением в браузере</li>
          <li>Адаптивная панель на мобильных устройствах</li>
        </ul>
      </header>
      <main className={styles.cards}>
        <article className={styles.card}>
          <h2>Уход</h2>
          <p>Сыворотки, кремы и SPF — подбор по типу кожи в онлайн-чате.</p>
        </article>
        <article className={styles.card}>
          <h2>Макияж</h2>
          <p>Тональные средства и декоративная линия с пробами в центре красоты.</p>
        </article>
        <article className={styles.card}>
          <h2>Центр красоты</h2>
          <p>Запись и консультации по телефону {BEAUTY_CENTER_PHONE}.</p>
        </article>
      </main>
      <ChatWidget />
    </div>
  );
}
