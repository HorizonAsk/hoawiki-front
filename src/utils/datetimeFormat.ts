import { Language } from "@/utils/constant/language";

interface Config {
  thresholds: [number, string, string][];
  nowPhrase: string;
  pastPhraseFormat: (quantity: number, unit: string) => string;
  futurePhraseFormat: (quantity: number, unit: string) => string;
  durationPhraseFormat: (quantity: number, unit: string) => string;
}

const enConfig: Config = {
  thresholds: [
    [31536000, "year", "years"],
    [2628000, "month", "months"],
    [604800, "week", "weeks"],
    [86400, "day", "days"],
    [3600, "hour", "hours"],
    [60, "minute", "minutes"],
    [1, "second", "seconds"],
  ],
  nowPhrase: `just now`,
  pastPhraseFormat: (quantity: number, unit: string) => {
    return `${quantity} ${unit} ago`;
  },
  futurePhraseFormat: (quantity: number, unit: string) => {
    return `in ${quantity} ${unit}`;
  },
  durationPhraseFormat: (quantity: number, unit: string) => {
    return `${quantity} ${unit}`;
  },
};

const zhConfig: Config = {
  thresholds: [
    [31536000, "年", "年"],
    [2628000, "月", "月"],
    [604800, "周", "周"],
    [86400, "天", "天"],
    [3600, "小时", "小时"],
    [60, "分钟", "分钟"],
    [1, "秒", "秒"],
  ],
  nowPhrase: `刚刚`,
  pastPhraseFormat: (quantity: number, unit: string) => {
    return `${quantity} ${unit}前`;
  },
  futurePhraseFormat: (quantity: number, unit: string) => {
    return `${quantity} ${unit}后`;
  },
  durationPhraseFormat: (quantity: number, unit: string) => {
    return `${quantity} ${unit}`;
  },
};

const languageConfigFactory = (language: Language) => {
  switch (language) {
    case Language.en:
      return enConfig;
    case Language.zh:
      return zhConfig;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};

class FluentDate {
  static language: Language =
    Language[
      localStorage.getItem("locale") === null
        ? "en"
        : localStorage.getItem("locale")
    ];
  static config: Config = languageConfigFactory(FluentDate.language);

  // relative(inputDate: number) {
  //   const now = Date.now();
  //   const elapsedSeconds = Math.floor((now - inputDate) / 1000);
  //   for (const threshold of FluentDate.config.thresholds) {
  //     if (elapsedSeconds < threshold[0]) continue;
  //     const quantity = Math.floor(elapsedSeconds / threshold[0]);
  //     const unit = quantity === 1 ? threshold[1] : threshold[2];
  //     return FluentDate.config.pastPhraseFormat(quantity, unit);
  //   }
  //   return FluentDate.config.nowPhrase;
  // }

  static parse(date: string): number {
    const dateValue = new Date(date);
    return dateValue.getTime();
  }

  static parseAndRelative(dateString: string): string {
    const dateValue = FluentDate.parse(dateString);
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - dateValue) / 1000);
    for (const threshold of FluentDate.config.thresholds) {
      if (elapsedSeconds < threshold[0]) continue;
      const quantity = Math.floor(elapsedSeconds / threshold[0]);
      const unit = quantity === 1 ? threshold[1] : threshold[2];
      return this.config.pastPhraseFormat(quantity, unit);
    }
    return this.config.nowPhrase;
  }
}

export { FluentDate };
