export default {
  meta: {
    role: 'ソフトウェアエンジニア',
    tagline:
      '安全でスケーラブルなウェブプラットフォームを構築しています — 認証基盤、マイクロフロントエンドのパフォーマンス、AI支援による開発者ツール。',
    summary:
      'エンタープライズSaaSおよびマルチクラウド環境で、安全かつスケーラブルなウェブプラットフォームを構築してきたソフトウェアエンジニア。認証基盤（SSO、MFA、OAuth、RBAC）、マイクロフロントエンドのパフォーマンス最適化、複数のハイパースケーラーとグローバルリージョンにまたがる顧客向けのコアプラットフォーム機能の提供実績があります。AI支援の開発ツールを活用し、開発速度とコード品質の向上を得意としています。',
  },

  nav: {
    home: 'ホーム',
    experience: '経歴',
    skills: 'スキル',
    education: '学歴',
    certifications: '資格',
    projects: 'プロジェクト',
    writing: '記事',
    resume: '履歴書',
    contact: 'お問い合わせ',
    menu: 'メニュー',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
    primary: 'メインナビゲーション',
    skipToContent: '本文へスキップ',
  },

  common: {
    downloadCV: '履歴書をダウンロード',
    getInTouch: 'お問い合わせ',
    viewLive: 'ライブを見る',
    liveDemo: 'ライブ',
    sourceCode: 'ソースコード',
    code: 'コード',
    details: '詳細',
    readMore: '続きを読む',
    backToHome: 'ホームに戻る',
    allProjects: 'すべてのプロジェクト',
    allWriting: 'すべての記事',
    language: '言語',
    changeLanguage: '言語を変更',
    theme: 'テーマ',
    changeTheme: 'テーマを変更',
    minRead: '分で読めます',
    builtWith: 'React と Tailwind で構築',
    opensInNewTab: '新しいタブで開きます',
    more: 'その他',
  },

  themes: {
    dark: 'ダーク',
    light: 'ライト',
    grey: 'グレースケール',
    paper: 'ペーパー',
    terminal: 'ターミナル',
    ocean: 'オーシャン',
  },

  home: {
    greeting: 'こんにちは、{name} です',
    scrollCta: 'スクロールして見る',
    aboutTitle: '私について',
    aboutEyebrow: 'プロフィール',
    currently: '現在',
    education: '学歴',
    basedIn: '拠点',
    languages: '言語',
    degreeShort: '工学士、コンピュータサイエンス',
    hobbies: '趣味',
    exploreMore: 'もっと見る',
  },

  roles: [
    'ソフトウェアエンジニア',
    'フルスタック開発者',
    '認証・セキュリティエンジニア',
    'AIの探求者',
  ],

  hobbies: {
    swimming: '水泳',
    running: 'ランニング',
    cycling: 'サイクリング',
    cinema: '映画',
  },

  stats: {
    heading: '数字で見る成果',
    environments: { label: '本番環境', detail: '3つのハイパースケーラー · 3リージョン' },
    uptime: { label: '稼働率', detail: '集中ログインサービス' },
    latency: { label: '高速化したフロントエンド', detail: 'マイクロフロントエンドの遅延を半減' },
    vulns: { label: '解消した脆弱性', detail: 'Snyk の自動修正' },
  },

  experience: {
    eyebrow: '経歴',
    title: 'これまでの職歴',
    description:
      'エンタープライズSaaSプラットフォームにおける認証基盤、アクセス制御、AI支援による開発者ツール。',
    present: '現在',
    'contentstack-ase': {
      role: 'アソシエイトソフトウェアエンジニア',
      summary:
        'マルチクラウド・マルチリージョンのSaaSプラットフォーム全体で認証とアクセス制御の基盤を担当し、エンジニアリング組織が日常的に使うAIツールを開発しています。',
      highlights: [
        '7つの本番環境（3つのハイパースケーラー — AWS、GCP、Azure、3リージョン — 北米、欧州、豪州）、3つのステージング環境、22の開発環境にわたってユーザーを認証する集中ログインサービスを設計・実装し、SSO、MFA/OTP、バックアップコード、パスワード復旧を備えて稼働率100%を維持しました。',
        'モノリスと4つのマイクロサービス全体にわたる、きめ細かなロールベースアクセス制御（RBAC）をエンドツーエンドで設計・リリースし、アクセス制御の粒度を高めて業界のセキュリティ標準に適合させました。',
        'リージョンごとのログイン体験に双方向（Bi-Di）の多言語対応を組み込み、あわせてマーケティングがコンテンツを動的に管理できるCMS設定可能なログインページを構築しました。',
        '顧客向けAPIにOAuth 2.0を実装し、標準準拠のトークンベース認可フローとスコープ付きアクセスにより、安全なサードパーティ連携を可能にしました。',
        'Claude routines を用いた自動化を構築してSnykの脆弱性を検出・修正し、プルリクエストを自動作成してSlackへ投稿することで、未対応の指摘を500件以上からゼロに削減しました。',
        'プルリクエストを関連するJiraチケットの受け入れ基準と照合して検証する、AIによるコードレビュー自動化を開発し、レビューの品質と一貫性を向上させました。',
        '製品ドキュメント、過去のチャット履歴、データログ、コードベースから文脈を取得し、Slack上で顧客の問い合わせに応答するAIエージェントを実装しました。',
        '認証とプラットフォームのワークフローに焦点を当てた再利用可能なAIスキルをエンジニアリングチーム向けに作成・保守し、オンボーディングの負担と立ち上がり時間を削減しました。',
        'モノリスと10以上のマイクロサービスに新しい全社ブランディングを適用し、顧客が触れるすべての画面で一貫した体験を実現しました。',
        'SSO、SCIM、Teams、ユーザー管理、セキュリティなど、中核となるプラットフォーム機能に貢献しました。',
      ],
    },
    'contentstack-intern': {
      role: 'アソシエイトソフトウェアエンジニアリングインターン',
      summary:
        '多要素認証、製品間SSO、そして測定可能なマイクロフロントエンドの性能改善を提供しました。',
      highlights: [
        '主要な認証アプリすべてに対応するTOTPベースの多要素認証を、SMSによる2FAのフォールバックとバックアップコードとともに、業界のセキュリティ標準に従って実装しました。',
        '新たに買収した製品（Lytics）とContentstackの間にSSOベースの認証を構築して統合し、単一の認証情報でシームレスな製品横断体験を実現しました。',
        'マイクロフロントエンドの性能（React 18 + Module Federation）を最適化してフロントエンドの遅延を2分の1に削減し、アーキテクチャ判断の指針となる比較ベンチマークを文書化しました。',
        '10以上のマイクロフロントエンドにOPAポリシーベースのナビゲーションとアプリスイッチャーを実装し、頻繁なリリースでも一貫した挙動を保つエンドツーエンドのテスト自動化で担保しました。',
        '購読者に最新情報を届け、製品のSEOを改善するための組織向けRSSフィードを構築しました。',
      ],
    },
  },

  globe: {
    eyebrow: 'グローバル規模',
    title: 'プラットフォームの稼働地域',
    description:
      '集中ログインサービスは3つのハイパースケーラーと3つのリージョンでユーザーを認証し、7つの本番環境、3つのステージング環境、22の開発環境を支えています。',
    regions: 'リージョン',
    hyperscalers: 'ハイパースケーラー',
    production: '本番',
    staging: 'ステージング',
    development: '開発',
    hint: 'ドラッグで回転',
  },

  skills: {
    eyebrow: 'スキル',
    title: '使用している技術',
    description: '自己評価の割合ではなく、分野ごとに整理しています。',
    groups: {
      languages: '言語',
      frontend: 'フロントエンド',
      backend: 'バックエンド',
      auth: '認証・セキュリティ',
      data: 'データベース',
      cloud: 'クラウド・DevOps',
      ai: 'AI / ML エンジニアリング',
      testing: 'テスト・ツール',
    },
  },

  education: {
    eyebrow: '学歴',
    title: '学んだ場所',
    btech: { title: '工学士、コンピュータサイエンス・工学', detail: 'GPA: 8.5 / 10' },
    'high-school': { title: '高等教育課程' },
    schooling: { title: '初等・中等教育' },
    locations: { puducherry: 'インド・プドゥチェリー' },
  },

  certifications: {
    eyebrow: '資格',
    title: '資格',
    description: '修了した講座と認定。',
    verify: '確認する',
  },

  projects: {
    eyebrow: 'プロジェクト',
    title: '作ってきたもの',
    description: '業務での開発と個人プロジェクトの両方です。カードを開くと詳細を読めます。',
    filterAll: 'すべて',
    filterHeading: '技術でプロジェクトを絞り込む',
    shown: '{count} 件のプロジェクトを表示',
    none: '{tech} を使ったプロジェクトはまだありません。',
    highlights: 'ハイライト',
    builtWith: '使用技術',
    moreProjects: '他のプロジェクト',
    'chat-app': {
      title: 'リアルタイムチャットアプリ',
      blurb: 'ボイスメモ、リアクション、既読表示に対応したサーバーレスの1対1リアルタイムメッセージング。',
      description:
        'ボイスメモ、リアクション、返信、既読表示、入力中・オンライン表示を備えたサーバーレスの1対1リアルタイムメッセージングアプリ。Firestoreがライブ同期を担い、Firebase Authが複数ユーザーの登録とログインを処理し、Cloud Storageがボイスメッセージを保管します。',
      highlights: [
        'Firestoreのリスナーによるメッセージのライブ同期とオンライン表示。運用するバックエンドサーバーは不要です。',
        'ブラウザ上で録音し、Firebase Cloud Storageに保存されるボイスメモ。',
        '既読表示、入力中インジケーター、スレッド返信、絵文字リアクション。',
      ],
    },
    eventhub: {
      title: 'EventHub',
      blurb: '大学・高等教育機関向けのイベント登録・参加プラットフォーム。',
      description:
        '学生と教育機関がイベントの登録・参加・告知を行えるウェブプラットフォーム。Firebaseによるリアルタイムデータに対応しています。',
      highlights: [
        'イベントを探す学生と、イベントを公開する教育機関それぞれに分かれた導線。',
        'Firebaseに支えられたリアルタイムの登録・参加状況。',
      ],
    },
    ecommerce: {
      title: 'eコマースアプリ',
      blurb: 'Node.js APIに支えられた、商品閲覧とカート機能を備えたストアフロント。',
      description: 'Node.jsバックエンドが提供する、商品閲覧とカート管理を扱うストアフロントのインターフェース。',
      highlights: [],
    },
    connect: {
      title: 'Connect',
      blurb: '素のJavaScriptで構築したレスポンシブな複数セクション構成のウェブUI。',
      description: 'フレームワークを使わず、素のHTML・CSS・JavaScriptで構築したレスポンシブな複数セクション構成のウェブUI。',
      highlights: [],
    },
    studentportal: {
      title: '学生ポータル',
      blurb: '学生向け学務ポータルのフロントエンド。',
      description: '学生向け学務ポータルのレイアウトをフロントエンドとして実装したもの。',
      highlights: [],
    },
  },

  resume: {
    eyebrow: '履歴書',
    title: '履歴書',
    print: '印刷',
    downloadPdf: 'PDFをダウンロード',
    summary: '職務要約',
    skills: '技術スキル',
    experience: '職務経歴',
    education: '学歴',
    projects: 'プロジェクト',
    certifications: '資格',
    languages: '言語',
  },

  contact: {
    eyebrow: 'お問い合わせ',
    title: 'ご連絡ください',
    description:
      '興味深い課題、協業、新しい機会を歓迎しています。通常1〜2日以内に返信します。',
    name: 'お名前',
    namePlaceholder: 'Ada Lovelace',
    email: 'メールアドレス',
    emailPlaceholder: 'ada@example.com',
    message: 'メッセージ',
    messagePlaceholder: '今どんなことに取り組んでいますか？',
    send: 'メッセージを送信',
    sending: '送信中…',
    sent: 'ありがとうございます — メッセージを送信しました。',
    errorGeneric: '送信できませんでした。お手数ですが {email} まで直接ご連絡ください。',
    errorUnconfigured: 'お問い合わせフォームはまだ設定されていません。{email} までご連絡ください。',
    errors: {
      name: 'お名前を入力してください。',
      emailRequired: '返信のためにメールアドレスが必要です。',
      emailInvalid: 'メールアドレスの形式が正しくないようです。',
      messageRequired: 'メッセージを入力してください。',
      messageShort: 'もう少し詳しく書いていただけると助かります。',
    },
    honeypot: '会社名（空欄のままにしてください）',
  },

  writing: {
    eyebrow: '記事',
    title: 'ノートと記事',
    description: '書き留めておく価値があると感じた学びです。',
    readExternally: '外部サイトで読む',
  },

  chat: {
    name: 'Astro',
    subtitle: 'Chandraj のAIアシスタント',
    open: 'Astro とチャット',
    close: 'チャットを閉じる',
    greeting:
      'こんにちは！私は Astro です — Chandraj の経歴、スキル、プロジェクトについてお答えできます。何が知りたいですか？',
    placeholder: '経歴について聞いてみてください…',
    send: '送信',
    thinking: 'Astro が入力中…',
    error: 'サーバーに接続できませんでした。少し時間をおいて再度お試しください。',
    unconfigured: 'この環境では Astro はまだ設定されていません。{email} から Chandraj に直接ご連絡いただけます。',
    disclaimer: 'AIが生成した内容です。正確でない場合があります。',
    clear: '会話を消去',
    suggestions: [
      'Chandraj は Contentstack で何をしていますか？',
      '認証とセキュリティの仕事について教えてください',
      'AIで何を作っていますか？',
      '最もよく使う技術は何ですか？',
    ],
  },

  notFound: {
    title: 'そのページは存在しません',
    description: 'リンクが古いか、ページが移動された可能性があります。',
    seeProjects: 'プロジェクトを見る',
  },

  errorBoundary: {
    title: 'このページで問題が発生しました。',
    description: '私の側の問題です。再読み込みで解決することがほとんどです。',
  },
}
