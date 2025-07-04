"use client"

import React, { useMemo, useState } from "react"
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputPasswordProps extends React.ComponentProps<'input'> {
  checkStrengthPassword: boolean
}

export default function InputPassword({
  checkStrengthPassword = true,
  name,
  ...props
}: InputPasswordProps) {
  const [password, setPassword] = useState("")
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "Pelo menos 8 caracteres" },
      { regex: /[0-9]/, text: "Pelo menos 1 número" },
      { regex: /[a-z]/, text: "Pelo menos 1 letra minúscula" },
      { regex: /[A-Z]/, text: "Pelo menos 1 letra maiúscula" },
    ]

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }))
  }

  const strength = checkStrength(password)

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length
  }, [strength])

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border"
    if (score <= 1) return "bg-red-500"
    if (score <= 2) return "bg-orange-500"
    if (score === 3) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return "Digite uma senha"
    if (score <= 2) return "Senha fraca"
    if (score === 3) return "Senha média"
    return "Senha forte"
  }

  return (
    <div>
      <div className="*:not-first:mt-2">
        <Label htmlFor={name}>Senha</Label>
        <div className="relative">
          <Input
            id={name}
            name={name}
            className="pe-9"
            placeholder="Senha"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby={`${name}-description`}
            {...props}
          />
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOffIcon size={16} aria-hidden="true" />
            ) : (
              <EyeIcon size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {
        checkStrengthPassword && (
          <>
            <div
              className="bg-lochmara-100 mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
              role="progressbar"
              aria-valuenow={strengthScore}
              aria-valuemin={0}
              aria-valuemax={4}
              aria-label="Força da senha"
            >
              <div
                className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                style={{ width: `${(strengthScore / 4) * 100}%` }}
              ></div>
            </div>

            <p
              id={`${name}-description`}
              className="text-foreground mb-2 text-sm font-medium"
            >
              {getStrengthText(strengthScore)}. Deve conter:
            </p>

            <ul className="space-y-1.5" aria-label="Requisitos da senha">
              {strength.map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  {req.met ? (
                    <CheckIcon
                      size={16}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <XIcon
                      size={16}
                      className="text-muted-foreground/80"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
                  >
                    {req.text}
                    <span className="sr-only">
                      {req.met ? " - Requisito atendido" : " - Requisito não atendido"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )
      }
    </div>
  )
}
