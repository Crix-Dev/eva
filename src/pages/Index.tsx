import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SECRET_CODE = "123456789";

const REASONS = [
  "Тепло",
  "Доверие", 
  "Смешная",
  "Понимающая",
  "Искренность",
  "Поддержка(даже с юмором)",
  "Веселая",
  "Честность(ну не везде, конечно )",
  "Добрая",
  "Хорошая",
  "Милая",
  "Красивая"
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'code' | 'reasons' | 'final'>('code');
  const [code, setCode] = useState('');
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const [visibleReasons, setVisibleReasons] = useState<number[]>([]);
  const { toast } = useToast();

  const handleCodeSubmit = () => {
    if (code === SECRET_CODE) {
      setCurrentStep('reasons');
      startWordsAnimation();
    } else {
      toast({
        variant: "destructive",
        description: "Упс, допущена ошибка)"
      });
    }
  };

  const startWordsAnimation = () => {
    const words = "Эва, вот причины, почему я с тобой общаюсь, да и не только:".split(' ');
    words.forEach((word, index) => {
      setTimeout(() => {
        setVisibleWords(prev => [...prev, word]);
      }, index * 300);
    });

    // Показываем причины после основного текста
    setTimeout(() => {
      REASONS.forEach((_, index) => {
        setTimeout(() => {
          setVisibleReasons(prev => [...prev, index]);
        }, index * 200);
      });
    }, words.length * 300 + 500);
  };

  const handleNext = () => {
    setCurrentStep('final');
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        
        {/* Код ввода */}
        {currentStep === 'code' && (
          <Card className="p-8 shadow-romantic bg-card/80 backdrop-blur-sm animate-fade-in-word">
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-4">
                <Heart className="text-primary animate-pulse-soft" size={48} />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-6">
                Введите секретный код
              </h1>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Введите код..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit()}
                />
                <Button 
                  onClick={handleCodeSubmit}
                  className="w-full bg-gradient-romantic hover:shadow-romantic transition-all duration-300"
                  size="lg"
                >
                  Продолжить
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Причины */}
        {currentStep === 'reasons' && (
          <div className="text-center space-y-8">
            <div className="flex justify-center mb-6">
              <Sparkles className="text-primary animate-float" size={40} />
            </div>
            
            {/* Основной текст */}
            <div className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
              {visibleWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block mr-2 animate-fade-in-word"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Список причин */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {REASONS.map((reason, index) => (
                <div
                  key={index}
                  className={`
                    p-4 rounded-lg bg-gradient-glow border border-border
                    transition-all duration-500 transform
                    ${visibleReasons.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                    }
                  `}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-primary font-bold text-lg">
                      {index + 1})
                    </span>
                    <span className="text-foreground font-medium">
                      {reason}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Кнопка Далее */}
            {visibleReasons.length === REASONS.length && (
              <div className="mt-8 animate-fade-in-word">
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-romantic hover:shadow-romantic transition-all duration-300"
                  size="lg"
                >
                  Далее
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Финальное сообщение */}
        {currentStep === 'final' && (
          <Card className="p-8 shadow-romantic bg-card/80 backdrop-blur-sm animate-fade-in-word text-center">
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <Heart className="text-primary animate-pulse-soft" size={48} />
              </div>
              
              <div className="text-xl md:text-2xl font-medium text-foreground leading-relaxed space-y-4">
                <p className="animate-fade-in-word">
                  <strong>12.06.2026</strong> – я должен приехать в Новороссийск на 4 дня
                </p>
                
                <div className="pt-6 animate-fade-in-word" style={{ animationDelay: '1s' }}>
                  <p className="text-2xl font-bold text-primary animate-pulse-soft">
                    Вот и все, секрет раскрыт
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-2 pt-4">
                <Sparkles className="text-primary animate-float" size={24} />
                <Heart className="text-primary animate-pulse-soft" size={24} />
                <Sparkles className="text-primary animate-float" size={24} style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
