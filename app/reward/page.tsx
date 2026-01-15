'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TOTAL_PIECES = 26;

const wishes = [
  'Chúc em một ngày mới ngọt ngào 💕',
  'Không biết đợt đi này có cãi nhau gì không. Nếu có thì vừa 💩🖕 để chửi con mèo và vừa 💟💋 để yêu thương và xin lỗi vì làm công chúa buồn',
  'Nừn ná na na con mèo sushi 😊',
  'Tâm trạng của mèo con nay sao rồi? Có còn xa lạ như ngày đầu không? 😢',
  'Sending positive energy ✨',
  'Hôm nay có phải trực đêm không? Nhớ anh quá thì mở cái này ra 😏',
  'Ngày hôm nay của công chúa sao rồi? Mình đ bik vì mình code sẵn mà kkk, chắc trương cà lên ngủ 🛌',
  'Hôm nay người đẹp đớp gì? Có ngon không? Ăn mấy bát? 💖',
  'Morning, sunshine. Dù không biết mèo ú xem lúc nào 🌞',
  'Hello, gorgeous. May I have your number? 😉',
  '可不可以，跟我说一句，说“我爱你”，让我心happy 😛',
  'Hai ba con heo, anh rất là nhớ mèo Meo 😸',
  'Tiểu thư hôm nay không ngủ gật trong giờ đấy chứ? 🌹',
  '宝贝，想我吗？我想你了 🌸',
];

export default function RewardPage() {
  const router = useRouter();
  const [pieces, setPieces] = useState<number[]>([]);
  const [wish, setWish] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn !== 'true') {
      router.push('/login');
      return;
    }

    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');
    const stored: number[] = JSON.parse(
      localStorage.getItem('puzzlePieces') || '[]'
    );

    let updated = stored;

    // =============================
    // 🌸 XỬ LÝ NGÀY MỚI
    // =============================
    if (lastLogin !== today && stored.length < TOTAL_PIECES) {
      // ---- Puzzle piece ----
      const remaining = Array.from(
        { length: TOTAL_PIECES },
        (_, i) => i
      ).filter(i => !stored.includes(i));

      const randomPiece =
        remaining[Math.floor(Math.random() * remaining.length)];

      updated = [...stored, randomPiece];
      localStorage.setItem('puzzlePieces', JSON.stringify(updated));
      localStorage.setItem('lastLoginDate', today);

      // ---- Wish (XOAY TUA) ----
      let usedWishes: number[] = JSON.parse(
        localStorage.getItem('usedWishes') || '[]'
      );

      // Dùng hết → reset vòng mới
      if (usedWishes.length >= wishes.length) {
        usedWishes = [];
      }

      const availableIndexes = wishes
        .map((_, i) => i)
        .filter(i => !usedWishes.includes(i));

      const chosenIndex =
        availableIndexes[
          Math.floor(Math.random() * availableIndexes.length)
        ];

      const todayWish = wishes[chosenIndex];

      usedWishes.push(chosenIndex);

      localStorage.setItem(
        'usedWishes',
        JSON.stringify(usedWishes)
      );
      localStorage.setItem('todayWish', todayWish);

      setWish(todayWish);
    } else {
      // =============================
      // 🌸 TRONG CÙNG NGÀY
      // =============================
      const savedWish = localStorage.getItem('todayWish');
      if (savedWish) {
        setWish(savedWish);
      }
    }

    setPieces(updated);
  }, [router]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff0f6',
        padding: 20,
        textAlign: 'center',
      }}
    >
      <h1>🧩 Mảnh ghép yêu thương</h1>

      <p>
        Tiến độ: {pieces.length} / {TOTAL_PIECES}
      </p>

      {/* Thanh tiến độ */}
      <div
        style={{
          width: 260,
          height: 12,
          background: '#ffd6e7',
          borderRadius: 6,
          margin: '10px auto',
        }}
      >
        <div
          style={{
            width: `${(pieces.length / TOTAL_PIECES) * 100}%`,
            height: '100%',
            background: '#ff8fb1',
            borderRadius: 6,
          }}
        />
      </div>

      {/* Lời chúc */}
      {wish && (
        <p style={{ marginTop: 10, color: '#d6336c' }}>
          💌 {wish}
        </p>
      )}

      {/* Puzzle 13 × 2 */}
      <div
        style={{
          margin: '20px auto',
          width: 390,
          display: 'grid',
          gridTemplateColumns: 'repeat(13, 1fr)',
          gap: 2,
        }}
      >
        {Array.from({ length: TOTAL_PIECES }, (_, i) => (
          <div
            key={i}
            style={{
              width: 30,
              height: 60,
              backgroundColor: pieces.includes(i)
                ? '#fff'
                : '#ffe3ec',
              backgroundImage: pieces.includes(i)
                ? 'url(/puzzle.jpg)'
                : 'none',
              backgroundSize: '390px 120px',
              backgroundPosition: `-${(i % 13) * 30}px -${
                Math.floor(i / 13) * 60
              }px`,
            }}
          />
        ))}
      </div>

      {pieces.length === TOTAL_PIECES && (
        <h2 style={{ color: '#e64980' }}>
          🎉 Bức tranh đã hoàn thành! Chúc mừng chiến sĩ mèo xuất
          ngũ! 🎉
        </h2>
      )}
    </div>
  );
}
