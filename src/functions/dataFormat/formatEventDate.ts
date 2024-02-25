type FormatDate = {
  dateStr: string;
  format: 'monthDay' | 'inWeek'; // 明示的な方がわかりやすいので必須
};

export function formatEventDate({ dateStr, format }: FormatDate): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
  const dayOfWeek = dayNames[date.getDay()]; // getDay() で曜日インデックスを取得し、日本語の曜日に変換

  const formatInWeek = `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日（${dayOfWeek}）`;
  const formatInMonthDay = `(${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')})`;
  // 月と日のみを出力
  if (format === 'monthDay') return formatInMonthDay;

  // 曜日を含む完全な日付を出力
  return formatInWeek;
}
