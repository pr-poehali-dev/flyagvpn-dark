import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
  isPremium: boolean;
}

const servers: Server[] = [
  { id: '1', name: 'Амстердам', country: 'Нидерланды', flag: '🇳🇱', ping: 45, load: 35, isPremium: false },
  { id: '2', name: 'Нью-Йорк', country: 'США', flag: '🇺🇸', ping: 120, load: 62, isPremium: true },
  { id: '3', name: 'Токио', country: 'Япония', flag: '🇯🇵', ping: 180, load: 28, isPremium: true },
  { id: '4', name: 'Лондон', country: 'Великобритания', flag: '🇬🇧', ping: 55, load: 48, isPremium: true },
  { id: '5', name: 'Сингапур', country: 'Сингапур', flag: '🇸🇬', ping: 200, load: 41, isPremium: true },
  { id: '6', name: 'Франкфурт', country: 'Германия', flag: '🇩🇪', ping: 40, load: 52, isPremium: false },
];

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasPremium, setHasPremium] = useState(false);
  const [userName, setUserName] = useState('Пользователь');
  const [userEmail] = useState('user@example.com');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(userName);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState({
    vk: false,
    telegram: false
  });

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleSaveProfile = () => {
    setUserName(editName);
    setIsEditingProfile(false);
  };

  const handleLinkAccount = (provider: 'vk' | 'telegram') => {
    setLinkedAccounts(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Plane" size={24} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">FlyagVPN</h1>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeTab === 'dashboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeTab === 'about' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              О сервисе
            </button>
            <button
              onClick={() => setActiveTab('premium')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeTab === 'premium' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Премиум
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Профиль
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Avatar className="hidden md:block">
              <AvatarFallback className="bg-primary text-primary-foreground">ПО</AvatarFallback>
            </Avatar>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-6 pt-8">
                  <div className="flex flex-col items-center gap-4 pb-6 border-b border-border">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">ПО</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-semibold">Пользователь</p>
                      <p className="text-sm text-muted-foreground">user@example.com</p>
                    </div>
                  </div>
                  
                  <nav className="flex flex-col gap-2">
                    <button
                      onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeTab === 'dashboard' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                      }`}
                    >
                      <Icon name="LayoutDashboard" size={20} />
                      <span className="font-medium">Главная</span>
                    </button>
                    <button
                      onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeTab === 'about' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                      }`}
                    >
                      <Icon name="Info" size={20} />
                      <span className="font-medium">О сервисе</span>
                    </button>
                    <button
                      onClick={() => { setActiveTab('premium'); setMobileMenuOpen(false); }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeTab === 'premium' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                      }`}
                    >
                      <Icon name="Crown" size={20} />
                      <span className="font-medium">Премиум</span>
                    </button>
                    <button
                      onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                      }`}
                    >
                      <Icon name="User" size={20} />
                      <span className="font-medium">Профиль</span>
                    </button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8">
        {activeTab === 'dashboard' && (
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <Card className="p-4 md:p-8">
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {isConnected ? 'Подключено' : 'Не подключено'}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {isConnected
                        ? `Вы подключены к серверу ${selectedServer.name}`
                        : 'Нажмите кнопку для подключения к VPN'}
                    </p>
                  </div>

                  <div className="relative">
                    <button
                      onClick={handleConnect}
                      className={`w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 ${
                        isConnected
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50'
                          : 'bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/50'
                      }`}
                    >
                      <Icon
                        name={isConnected ? 'ShieldCheck' : 'Shield'}
                        size={56}
                        className="text-white md:w-16 md:h-16"
                      />
                    </button>
                    {isConnected && (
                      <div className="absolute inset-0 w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full bg-green-500/20 animate-ping" />
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2 md:gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-xs md:text-sm text-muted-foreground">Скорость</p>
                      <p className="text-lg md:text-2xl font-semibold">
                        {isConnected ? '125 Мбит/с' : '—'}
                      </p>
                    </div>
                    <div className="h-10 md:h-12 w-px bg-border" />
                    <div className="text-center">
                      <p className="text-xs md:text-sm text-muted-foreground">Ping</p>
                      <p className="text-lg md:text-2xl font-semibold">
                        {isConnected ? `${selectedServer.ping} мс` : '—'}
                      </p>
                    </div>
                    <div className="h-10 md:h-12 w-px bg-border" />
                    <div className="text-center">
                      <p className="text-xs md:text-sm text-muted-foreground">Трафик</p>
                      <p className="text-lg md:text-2xl font-semibold">
                        {isConnected ? '2.4 ГБ' : '—'}
                      </p>
                    </div>
                  </div>

                  {isConnected && (
                    <div className="pt-6">
                      <Button 
                        variant="outline" 
                        onClick={handleDisconnect}
                        className="w-full gap-2"
                      >
                        <Icon name="Power" size={20} />
                        Отключиться от VPN
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">Текущий сервер</h3>
                  <Badge variant="secondary" className="gap-1">
                    <Icon name="Wifi" size={14} />
                    Доступен
                  </Badge>
                </div>
                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                  <div className="text-4xl">{selectedServer.flag}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      {selectedServer.name}
                      {selectedServer.isPremium && !hasPremium && (
                        <Icon name="Lock" size={16} className="text-muted-foreground" />
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedServer.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Загрузка</p>
                    <p className="font-semibold">{selectedServer.load}%</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4 md:space-y-6">
              <Card className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-4">Доступные серверы</h3>
                <div className="space-y-2">
                  {servers.map((server) => {
                    const isLocked = server.isPremium && !hasPremium;
                    return (
                      <button
                        key={server.id}
                        onClick={() => !isLocked && setSelectedServer(server)}
                        disabled={isLocked}
                        className={`w-full p-3 rounded-lg transition-all active:scale-[0.98] relative ${
                          selectedServer.id === server.id
                            ? 'bg-primary text-primary-foreground'
                            : isLocked
                            ? 'bg-secondary/30 opacity-60 cursor-not-allowed'
                            : 'bg-secondary/50 hover:bg-secondary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{server.flag}</div>
                          <div className="flex-1 text-left">
                            <p className="font-medium flex items-center gap-2">
                              {server.name}
                              {isLocked && <Icon name="Lock" size={14} />}
                            </p>
                            <p className="text-xs opacity-75">{server.country}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p>{server.ping} мс</p>
                            <p className="text-xs opacity-75">{server.load}%</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto">
            <Card className="p-4 md:p-8">
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto">
                    <Icon name="Plane" size={40} className="text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">О FlyagVPN</h2>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Быстрый и безопасный VPN для защиты вашей приватности
                  </p>
                  <a 
                    href="https://t.me/flyagvpn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 3.792-1.362 5.032-.168.525-.5.7-.82.717-.697.063-1.226-.46-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.094.036.308.02.475z"/>
                    </svg>
                    Наш Telegram-канал
                  </a>
                </div>

                <div className="grid md:grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto">
                      <Icon name="Zap" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold">Высокая скорость</h3>
                    <p className="text-sm text-muted-foreground">
                      Современные серверы обеспечивают максимальную скорость соединения
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto">
                      <Icon name="Lock" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold">Полная защита</h3>
                    <p className="text-sm text-muted-foreground">
                      Военное шифрование AES-256 для защиты ваших данных
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto">
                      <Icon name="Globe" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold">Серверы по всему миру</h3>
                    <p className="text-sm text-muted-foreground">
                      Более 50 серверов в 30 странах мира для вашего удобства
                    </p>
                  </div>
                </div>

                <div className="pt-6 md:pt-8 border-t border-border space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold">Возможности</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-0.5" />
                      <span>Безлимитный трафик и скорость</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-0.5" />
                      <span>Kill Switch для автоматической защиты при разрыве соединения</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-0.5" />
                      <span>Политика нулевого логирования</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-0.5" />
                      <span>Поддержка всех устройств и платформ</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-0.5" />
                      <span>Круглосуточная техническая поддержка</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              <Card className="p-4 md:p-6 text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{userName}</h3>
                  <p className="text-sm text-muted-foreground">{userEmail}</p>
                </div>
                <Badge className="gap-1">
                  <Icon name="Crown" size={14} />
                  {hasPremium ? 'Premium' : 'Free'}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditingProfile(true)}
                  className="w-full gap-2"
                >
                  <Icon name="Edit" size={16} />
                  Редактировать профиль
                </Button>
              </Card>

              <Card className="md:col-span-2 p-4 md:p-6 space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Статистика</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Использовано трафика</p>
                      <p className="text-2xl font-semibold mt-1">24.8 ГБ</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Время подключения</p>
                      <p className="text-2xl font-semibold mt-1">156 часов</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Подключений</p>
                      <p className="text-2xl font-semibold mt-1">342</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Дней с VPN</p>
                      <p className="text-2xl font-semibold mt-1">87</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Безопасность</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsChangingPassword(true)}
                      className="w-full justify-start gap-2"
                    >
                      <Icon name="Lock" size={18} />
                      Изменить пароль
                    </Button>
                    
                    <div className="pt-2">
                      <p className="text-sm font-medium mb-3">Привязанные аккаунты</p>
                      <div className="space-y-2">
                        <Button
                          variant={linkedAccounts.vk ? "default" : "outline"}
                          onClick={() => handleLinkAccount('vk')}
                          className="w-full justify-start gap-2"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.39c-.34.87-1.64 1.83-2.76 1.83-1.52 0-2.23-.82-3.46-2.19-1.05-1.17-1.51-1.36-2.14-1.36-.17 0-.35.03-.52.07v3.25c0 .27-.22.49-.49.49h-1.5c-.27 0-.49-.22-.49-.49V8.61c0-.27.22-.49.49-.49h1.5c.27 0 .49.22.49.49v4.45c.65-.09 1.38-.73 2.09-1.55.93-1.07 1.58-2.41 1.77-3.65.05-.31.32-.54.63-.54h1.67c.34 0 .6.31.54.64-.2 1.15-.86 2.45-1.86 3.67-.54.66-1.1 1.24-1.59 1.7.82.88 1.79 1.89 2.57 2.63.47.45.81.91.92 1.43.08.36-.12.7-.49.7h-1.5c-.21 0-.41-.08-.56-.23-.76-.76-1.67-1.7-2.47-2.51.68-.55 1.45-1.31 2.04-2.11.75-.99 1.29-2.04 1.48-2.97h-.7c-.21.88-.65 1.77-1.25 2.54-.77.98-1.66 1.79-2.45 2.34v-5.5h-.7v9.39h.7v-2.75c.22-.04.44-.06.66-.06.88 0 1.57.34 2.7 1.59 1.02 1.13 1.61 1.84 2.77 1.84.65 0 1.41-.53 1.63-1.08.08-.19.03-.41-.11-.56-.39-.42-.92-.95-1.53-1.56-.91-.91-1.97-1.94-2.84-2.88 1.3-1.36 2.22-3.05 2.46-4.62h-.86c-.25 1.39-1.05 2.83-2.21 4.03-.72.75-1.52 1.42-2.27 1.91V8.61h-.7v7.88c-.75-.41-1.46-.99-2.07-1.69-.96-1.11-1.58-2.41-1.75-3.55h-.81c.19 1.33.95 2.79 2.07 4.07.66.76 1.4 1.41 2.13 1.84-.1.12-.21.23-.32.34-.84.82-1.75 1.36-2.56 1.36-.69 0-1.58-.57-1.85-1.19-.08-.18-.03-.39.12-.53.64-.59 1.33-1.31 1.92-2.09 1.08-1.42 1.84-2.99 2.08-4.31h-.87c-.26 1.16-.92 2.45-1.85 3.67-.62.82-1.32 1.54-1.98 2.11-.15.13-.36.15-.53.04-.18-.12-.27-.34-.22-.55.16-.67.62-1.32 1.26-1.93.63-.6 1.38-1.08 2.09-1.39V8.61h-.7v3.98c-.64.28-1.28.69-1.84 1.22-.53.5-.94 1.07-1.08 1.65-.07.28.02.58.24.77.21.19.51.24.77.13.6-.25 1.2-.71 1.73-1.28.78-.84 1.37-1.87 1.6-2.85h.85c-.24 1.18-.94 2.42-1.95 3.64-.67.81-1.43 1.51-2.16 2.03-.17.12-.28.31-.28.52 0 .73.96 1.54 2.04 1.54 1.02 0 2.13-.71 3.12-1.68.11-.11.23-.22.34-.34.52.34 1.08.64 1.66.86v2.62h.7V16.5c.59-.22 1.17-.52 1.71-.89 1.1 1.21 2.21 2.26 3.14 3.03.19.16.43.25.68.25h1.5c.61 0 1.05-.56.9-1.14z"/>
                          </svg>
                          {linkedAccounts.vk ? 'VK привязан' : 'Привязать VK'}
                        </Button>
                        <Button
                          variant={linkedAccounts.telegram ? "default" : "outline"}
                          onClick={() => handleLinkAccount('telegram')}
                          className="w-full justify-start gap-2"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 3.792-1.362 5.032-.168.525-.5.7-.82.717-.697.063-1.226-.46-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.094.036.308.02.475z"/>
                          </svg>
                          {linkedAccounts.telegram ? 'Telegram привязан' : 'Привязать Telegram'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Настройки</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-medium">Автоподключение</p>
                        <p className="text-sm text-muted-foreground">
                          Подключаться при запуске
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-medium">DNS Leak Protection</p>
                        <p className="text-sm text-muted-foreground">
                          Защита от утечки DNS
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-medium">Уведомления</p>
                        <p className="text-sm text-muted-foreground">
                          Получать уведомления о подключении
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>"}
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Получите Premium доступ</h2>
              <p className="text-lg text-muted-foreground">Разблокируйте все сервера и получите максимальную скорость</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-xl transition-shadow">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto">
                    <Icon name="Calendar" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">1 месяц</h3>
                  <div className="py-4">
                    <p className="text-4xl font-bold">299₽</p>
                    <p className="text-sm text-muted-foreground mt-1">в месяц</p>
                  </div>
                  <ul className="space-y-2 text-sm text-left">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Все сервера доступны
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Безлимитный трафик
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Максимальная скорость
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Приоритетная поддержка
                    </li>
                  </ul>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setHasPremium(true)}
                  >
                    Выбрать
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-2 border-primary relative hover:shadow-2xl transition-shadow">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Популярно
                </Badge>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto">
                    <Icon name="Zap" size={32} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">6 месяцев</h3>
                  <div className="py-4">
                    <p className="text-4xl font-bold">1499₽</p>
                    <p className="text-sm text-muted-foreground mt-1">250₽ в месяц</p>
                    <Badge variant="secondary" className="mt-2">Экономия 16%</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-left">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Все сервера доступны
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Безлимитный трафик
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Максимальная скорость
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Приоритетная поддержка
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Crown" size={16} className="text-primary" />
                      Эксклюзивные сервера
                    </li>
                  </ul>
                  <Button 
                    className="w-full"
                    onClick={() => setHasPremium(true)}
                  >
                    Выбрать
                  </Button>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-shadow">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto">
                    <Icon name="Trophy" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">12 месяцев</h3>
                  <div className="py-4">
                    <p className="text-4xl font-bold">2499₽</p>
                    <p className="text-sm text-muted-foreground mt-1">208₽ в месяц</p>
                    <Badge variant="secondary" className="mt-2">Экономия 30%</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-left">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Все сервера доступны
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Безлимитный трафик
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Максимальная скорость
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Приоритетная поддержка
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Crown" size={16} className="text-primary" />
                      Эксклюзивные сервера
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Star" size={16} className="text-primary" />
                      VIP поддержка 24/7
                    </li>
                  </ul>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setHasPremium(true)}
                  >
                    Выбрать
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="mt-8 p-6 bg-primary/10 border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Icon name="Gift" size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Получите 7 дней бесплатно</h3>
                    <p className="text-sm text-muted-foreground">При покупке любого тарифа на 6+ месяцев</p>
                  </div>
                </div>
                <Badge className="text-base px-4 py-2">Акция</Badge>
              </div>
            </Card>
          </div>
        )}
      </main>

      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать профиль</DialogTitle>
            <DialogDescription>
              Измените информацию о вашем профиле
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Введите ваше имя"
              />
            </div>
            <div className="space-y-2">
              <Label>Аватар</Label>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {editName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить фото
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Рекомендуемый размер: 400x400px
              </p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveProfile} className="flex-1">
                Сохранить
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setEditName(userName);
                  setIsEditingProfile(false);
                }}
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изменить пароль</DialogTitle>
            <DialogDescription>
              Введите текущий и новый пароль для изменения
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Текущий пароль</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Введите текущий пароль"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Новый пароль</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Введите новый пароль"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Повторите новый пароль"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button className="flex-1">
                Изменить пароль
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsChangingPassword(false)}
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;