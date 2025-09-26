"use client";
import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthServices";
import Image from "next/image";
import Logo from "@/assets/logo.jpg";
import { Eye, EyeOff, Lock, Mail, BookOpen, Users, Rocket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { setUser, user } = useAuth();
  const router = useRouter();
  const { t } = useTranslation("auth");

  const loginSchema = yup.object().shape({
    email: yup.string().required("email_required").email("email_email"),
    password: yup
      .string()
      .required("password_required")
      .min(8, "password_min")
      .max(255, "password_max"),
  });

  const checkLogin = () => {
    if (user && user.role === "super_admin") router.push("/overview");
  };

  useEffect(() => {
    checkLogin();
  }, [user]);
  const validateField = async (field: string, value: string) => {
    try {
      await loginSchema.validateAt(field, { [field]: value });
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [field]: error.message }));
      }
    }
  };

  const handleLogin = async () => {
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      setErrors({});
      setIsLoading(true);

      const res = await AuthService.login(email, password);

      if (!res.success) {
        toast.error(t(res.message || "login_failed"));
      } else {
        if (res.data) setUser(res.data);
        if(res.data && res.data.role === "super_admin"){
          toast.success(t("welcome_back"));
          router.push("/overview");
        }else{
          toast.error(t("role_error"));
        }
      }
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        validationError.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = t(error.message);
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  const features = [
    {
      icon: BookOpen,
      title: t("features.interactive_tools.title"),
      desc: t("features.interactive_tools.desc"),
    },
    {
      icon: Users,
      title: t("features.global_network.title"),
      desc: t("features.global_network.desc"),
    },
    {
      icon: Rocket,
      title: t("features.smart_matching.title"),
      desc: t("features.smart_matching.desc"),
    },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-secondary via-40% via-primary to-secondary rounded-r-2xl p-8 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
              <Image
                src={Logo}
                alt={t("wexplain")}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-primary-foreground">
              {t("wexplain")}
            </span>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground mb-4 leading-tight">
                {t("left_section.title")}
              </h1>
              <p className="text-primary-foreground/90 text-sm leading-relaxed max-w-md">
                {t("left_section.description")}
              </p>
            </div>

            <div className="space-y-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/10 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-md bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-primary-foreground block">
                      {title}
                    </span>
                    <span className="text-xs text-primary-foreground/80">
                      {desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-primary-foreground/70">
          {t("footer.copyright")}
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile Header */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-4 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Image
                  src={Logo}
                  alt={t("wexplain")}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-primary-black">
                {t("wexplain")}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary-black mb-1">
                {t("welcome_back")}
              </h2>
              <p className="text-neutral-600 text-sm">{t("mobile_subtitle")}</p>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block text-center space-y-3 mb-8">
            <h2 className="text-2xl font-semibold text-primary-black">
              {t("welcome_back")}
            </h2>
            <p className="text-neutral-600 text-sm">{t("desktop_subtitle")}</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl border border-neutral-150 shadow-sm p-6 space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-primary-black"
              >
                {t("email_address")}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder={t("email_placeholder")}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField("email", e.target.value);
                  }}
                  onBlur={() => validateField("email", email)}
                  onKeyPress={handleKeyPress}
                  className="pl-9 h-10 text-sm border-neutral-200 focus:border-primary transition-colors"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {t(errors.email)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-primary-black"
              >
                {t("password")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder={t("password_placeholder")}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validateField("password", e.target.value);
                  }}
                  onBlur={() => validateField("password", password)}
                  onKeyPress={handleKeyPress}
                  className="pl-9 pr-9 h-10 text-sm border-neutral-200 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-medium mt-1">
                  {t(errors.password)}
                </p>
              )}
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {t("signing_in")}
                </div>
              ) : (
                t("sign_in")
              )}
            </Button>

            <div className="text-center pt-2">
              <button className="text-xs text-neutral-600 hover:text-primary transition-colors">
                {t("need_help")}{" "}
                <span className="font-medium text-primary">
                  {t("contact_support")}
                </span>
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-neutral-500">{t("secure_login")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
