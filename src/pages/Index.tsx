import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
}

const servers: Server[] = [
  { id: '1', name: 'Амстердам', country: 'Нидерланды', flag: '🇳🇱', ping: 45, load: 35 },
  { id: '2', name: 'Нью-Йорк', country: 'США', flag: '🇺🇸', ping: 120, load: 62 },
  { id: '3', name: 'Токио', country: 'Япония', flag: '🇯🇵', ping: 180, load: 28 },
  { id: '4', name: 'Лондон', country: 'Великобритания', flag: '🇬🇧', ping: 55, load: 48 },
  { id: '5', name: 'Сингапур', country: 'Сингапур', flag: '🇸🇬', ping: 200, load: 41 },
  { id: '6', name: 'Франкфурт', country: 'Германия', flag: '🇩🇪', ping: 40, load: 52 },
];

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleConnect = () => {
    setIsConnected(!isConnected);
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
                    <h4 className="font-semibold text-lg">{selectedServer.name}</h4>
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
                  {servers.map((server) => (
                    <button
                      key={server.id}
                      onClick={() => setSelectedServer(server)}
                      className={`w-full p-3 rounded-lg transition-all active:scale-[0.98] ${
                        selectedServer.id === server.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/50 hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{server.flag}</div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">{server.name}</p>
                          <p className="text-xs opacity-75">{server.country}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p>{server.ping} мс</p>
                          <p className="text-xs opacity-75">{server.load}%</p>
                        </div>
                      </div>
                    </button>
                  ))}
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
              <Card className="p-4 md:p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    ПО
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">Пользователь</h3>
                <p className="text-sm text-muted-foreground mb-4">user@example.com</p>
                <Badge className="gap-1">
                  <Icon name="Crown" size={14} />
                  Premium
                </Badge>
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
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Настройки</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-medium">Kill Switch</p>
                        <p className="text-sm text-muted-foreground">
                          Автоматическая защита при разрыве
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

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
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;