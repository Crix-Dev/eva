import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Lock, Gift, Calendar, MapPin, Smile, Star, Users, Shield, Coffee, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SECRET_CODE = "123456789";

const REASONS = [
  { text: "Тепло", icon: Coffee, emoji: "☀️" },
  { text: "Доверие", icon: Shield, emoji: "🤝" }, 
  { text: "Смешная", icon: Smile, emoji: "😄" },
  { text: "Понимающая", icon: Users, emoji: "🤗" },
  { text: "Искренность", icon: Heart, emoji: "💯" },
  { text: "Поддержка(даже с юмором)", icon: Star, emoji: "🌟" },
  { text: "Веселая", icon: Music, emoji: "🎉" },
  { text: "Честность(ну не везде, конечно )", icon: Smile, emoji: "😉" },
  { text: "Добрая", icon: Heart, emoji: "😇" },
  { text: "Хорошая", icon: Star, emoji: "✨" },
  { text: "Милая", icon: Heart, emoji: "🥰" },
  { text: "Красивая", icon: Sparkles, emoji: "💖" }
];

const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <Heart
          key={i}
          className={`absolute text-primary/20 animate-hearts-float`}
          size={16 + (i % 3) * 8}
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${10 + (i * 10)}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + (i % 2)}s`
          }}
        />
      ))}
    </div>
  );
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'code' | 'reasons' | 'final'>('code');
  const [code, setCode] = useState('');
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const [visibleReasons, setVisibleReasons] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { toast } = useToast();

  const handleCodeSubmit = () => {
    if (code === SECRET_CODE) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep('reasons');
        setIsTransitioning(false);
        startWordsAnimation();
      }, 500);
    } else {
      toast({
        variant: "destructive",
        description: "Упс, допущена ошибка) 😅"
      });
    }
  };

  const startWordsAnimation = () => {
    const words = "Эва, вот причины, почему я с тобой общаюсь, да и не только: 💕".split(' ');
    words.forEach((word, index) => {
      setTimeout(() => {
        setVisibleWords(prev => [...prev, word]);
      }, index * 400);
    });

    // Показываем причины после основного текста
    setTimeout(() => {
      REASONS.forEach((_, index) => {
        setTimeout(() => {
          setVisibleReasons(prev => [...prev, index]);
        }, index * 300);
      });
    }, words.length * 400 + 800);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep('final');
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 sm:p-6 relative">
      <FloatingHearts />
      
      <div className="w-full max-w-4xl relative z-10">
        
        {/* Переходная анимация */}
        {isTransitioning && (
          <div className="fixed inset-0 bg-gradient-romantic opacity-80 flex items-center justify-center z-50">
            <div className="text-center">
              <Sparkles className="text-white animate-rotate-gentle mx-auto mb-4" size={48} />
              <p className="text-white text-xl font-medium animate-pulse-soft">Загружаем магию... ✨</p>
            </div>
          </div>
        )}
        
        {/* Код ввода */}
        {currentStep === 'code' && !isTransitioning && (
          <Card className="p-6 sm:p-8 shadow-romantic bg-card/90 backdrop-blur-sm animate-scale-bounce border-2 border-primary/20">
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-4 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-glow"></div>
                <Lock className="text-primary animate-bounce-gentle relative z-10" size={48} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 animate-slide-in-left">
                🔐 Введите секретный код для Евы
              </h1>
              <div className="space-y-6">
                <Input
                  type="text"
                  placeholder="🔢 Введите код..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-center text-lg sm:text-xl tracking-widest h-14 text-primary font-semibold border-2 border-primary/30 focus:border-primary transition-all duration-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit()}
                />
                <Button 
                  onClick={handleCodeSubmit}
                  className="w-full bg-gradient-romantic hover:shadow-romantic transition-all duration-300 h-14 text-lg font-semibold animate-slide-in-right"
                  size="lg"
                >
                  ✨ Продолжить ✨
                </Button>
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <Heart className="text-primary/40 animate-hearts-float" size={20} />
                <Sparkles className="text-primary/40 animate-float" size={20} />
                <Heart className="text-primary/40 animate-hearts-float" size={20} style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </Card>
        )}

        {/* Причины */}
        {currentStep === 'reasons' && !isTransitioning && (
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="flex justify-center mb-6 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-glow"></div>
              <Gift className="text-primary animate-float relative z-10" size={48} />
            </div>
            
            {/* Основной текст */}
            <div className="text-lg sm:text-xl md:text-2xl font-medium text-foreground leading-relaxed px-2">
              {visibleWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block mr-2 animate-fade-in-word"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Список причин */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-8 px-2">
              {REASONS.map((reason, index) => {
                const IconComponent = reason.icon;
                return (
                  <div
                    key={index}
                    className={`
                      p-4 rounded-xl bg-gradient-glow border-2 border-primary/20
                      transition-all duration-700 transform hover:scale-105 hover:shadow-romantic
                      ${visibleReasons.includes(index) 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                      }
                    `}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-primary font-bold text-lg">
                        {index + 1})
                      </span>
                      <IconComponent className="text-primary animate-bounce-gentle" size={20} />
                      <span className="text-2xl">{reason.emoji}</span>
                      <span className="text-foreground font-medium text-sm sm:text-base">
                        {reason.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Кнопка Далее */}
            {visibleReasons.length === REASONS.length && (
              <div className="mt-8 animate-scale-bounce">
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-romantic hover:shadow-romantic transition-all duration-300 h-12 px-8 text-lg font-semibold"
                  size="lg"
                >
                  🎁 Далее 🎁
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Финальное сообщение */}
        {currentStep === 'final' && !isTransitioning && (
          <Card className="p-6 sm:p-8 shadow-romantic bg-card/90 backdrop-blur-sm animate-scale-bounce text-center border-2 border-primary/30">
            <div className="space-y-6">
              <div className="flex justify-center mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-glow"></div>
                <Calendar className="text-primary animate-pulse-soft relative z-10" size={48} />
              </div>
              
              <div className="text-lg sm:text-xl md:text-2xl font-medium text-foreground leading-relaxed space-y-6">
                <div className="animate-slide-in-left flex items-center justify-center flex-wrap gap-2">
                  <Calendar className="text-primary animate-bounce-gentle" size={24} />
                  <span className="text-2xl">📅</span>
                  <strong className="text-primary">12.06.2026</strong> 
                  <span>– я должен приехать в</span>
                  <MapPin className="text-primary animate-float" size={20} />
                  <span className="text-primary font-semibold">Новороссийск</span>
                  <span>на 4 дня</span>
                  <span className="text-2xl">🌊</span>
                </div>
                
                <div className="pt-6 animate-slide-in-right" style={{ animationDelay: '1s' }}>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary animate-glow flex items-center justify-center flex-wrap gap-2">
                    <Gift className="animate-rotate-gentle" size={28} />
                    <span className="text-3xl">🎊</span>
                    Вот и все, секрет раскрыт
                    <span className="text-3xl">🎊</span>
                    <Gift className="animate-rotate-gentle" size={28} style={{ animationDelay: '2s' }} />
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-3 pt-6">
                <Sparkles className="text-primary animate-float" size={24} />
                <Heart className="text-primary animate-hearts-float" size={24} />
                <span className="text-3xl animate-bounce-gentle">💕</span>
                <Heart className="text-primary animate-hearts-float" size={24} style={{ animationDelay: '1s' }} />
                <Sparkles className="text-primary animate-float" size={24} style={{ animationDelay: '2s' }} />
              </div>

              <div className="text-sm text-muted-foreground animate-fade-in-word pt-4" style={{ animationDelay: '2s' }}>
                <span className="text-lg">🌹</span> Создано с любовью для Евы <span className="text-lg">🌹</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
