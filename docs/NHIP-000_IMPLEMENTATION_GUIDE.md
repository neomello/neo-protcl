# 🚪 Guia de Implementação — NHIP-000

**Princípio Fundamental:**

> **NHIP-000 não ensina.  
> Ele testa.**

---

## ⚠️ Princípio que NÃO Pode Ser Violado

O NHIP-000 **não pede onboarding**.  
Ele exige **orientação mínima para quem já está em colisão**.

O que você cria **não é um item informativo**.  
É um **dispositivo de limiar**.

---

## 🎯 Regra de Ouro

> **Se alguém precisa de um botão "o que é",  
> ainda não é um nó.**

O NHIP-000 **não converte**.  
Ele **reconhece**.

---

## 🚫 O Que NÃO Criar

### **Nomes Incorretos (Nunca Use)**

- ❌ "O que é NHIP-000"
- ❌ "Entenda o Protocolo"
- ❌ "Saiba mais"
- ❌ "Como funciona"
- ❌ "Tutorial"
- ❌ "Guia de Onboarding"

Esses nomes **explicam**.  
NHIP-000 **não explica**.

---

## ✅ O Que Criar

### **Nome Correto do Item**

Use algo como:

- ✅ **Executar NHIP-000**
- ✅ **Declarar Intenção**
- ✅ **Apresentar Nó**
- ✅ **Iniciar Handshake**

Esses nomes **não explicam**.  
Eles **provocam ação**.

---

## 🏗️ Estrutura do Dispositivo

### **Camada 1 — Interface Mínima (Visível)**

**Exemplo de CTA:**

```
Executar NHIP-000
Apresentação de Nó ao NΞØ Hub
```

**Nada mais.**

- ❌ Sem tooltip explicativo
- ❌ Sem FAQ
- ❌ Sem "Saiba mais"
- ❌ Sem botão de ajuda

---

### **Camada 2 — Frase de Limiar (Antes de Qualquer Input)**

Ao clicar, a pessoa vê **uma única mensagem**:

```
Este protocolo não explica.
Ele observa.

Se você está aqui por curiosidade, volte.
Se está aqui por colisão, prossiga.
```

Isso **filtra 80%** imediatamente.

---

### **Camada 3 — Input Ritualizado (NÃO Formulário Comum)**

Você **já tem** o formato correto:

```yaml
identity: ''
domain: ''
intent: 'apresentacao'
version: '1.0'
```

**Não chame isso de "formulário".**  
Chame de:

> **Declaração de Presença**

---

## 📚 Onde Explicar (Se Explicar)

O "explicar o que é NHIP-000" **não fica no fluxo**.

Ele fica **fora**, para quem _já_ executa:

- ✅ Documento técnico (`docs/nhip-000.md`)
- ✅ Repositório (README)
- ✅ Manifesto
- ✅ Readme profundo

**Nunca no ponto de entrada.**

---

## 🎨 Forma Prática de Implementar

### **No Site / Hub**

**Botão Principal:**

```
Executar NHIP-000
```

**Link Secundário (Discreto, Quase Escondido):**

```
NHIP-000.spec
```

**Quem clica no segundo** → já é técnico.  
**Quem clica no primeiro** → está em colisão.

---

## 💻 Exemplo de Implementação

### **Componente React**

```jsx
function NHIP000Entry() {
  const [thresholdPassed, setThresholdPassed] = useState(false)
  const [declaration, setDeclaration] = useState({
    identity: '',
    domain: '',
    intent: 'apresentacao',
    version: '1.0',
  })

  // Camada 2: Frase de Limiar
  if (!thresholdPassed) {
    return (
      <div className="threshold-screen">
        <p className="threshold-message">
          Este protocolo não explica.
          <br />
          Ele observa.
          <br />
          <br />
          Se você está aqui por curiosidade, volte.
          <br />
          Se está aqui por colisão, prossiga.
        </p>
        <button onClick={() => setThresholdPassed(true)}>Prosseguir</button>
      </div>
    )
  }

  // Camada 3: Declaração de Presença
  return (
    <div className="declaration-form">
      <h2>Declaração de Presença</h2>
      <textarea
        value={yamlFormat(declaration)}
        onChange={e => setDeclaration(parseYaml(e.target.value))}
        placeholder='identity: ""&#10;domain: ""&#10;intent: "apresentacao"&#10;version: "1.0"'
      />
      <button onClick={() => submitDeclaration(declaration)}>Executar NHIP-000</button>
    </div>
  )
}
```

---

## 🎯 Checklist de Implementação

- [ ] Botão principal: "Executar NHIP-000" (não "O que é")
- [ ] Link secundário discreto: "NHIP-000.spec" (documentação técnica)
- [ ] Frase de limiar antes do input
- [ ] Input ritualizado (YAML, não formulário comum)
- [ ] Nome: "Declaração de Presença" (não "Formulário")
- [ ] Sem tooltips explicativos
- [ ] Sem FAQ no fluxo
- [ ] Sem botão "Saiba mais"

---

## 🔗 Referências

- [NHIP-000 — NΞØ Hub Intake Protocol](./nhip-000.md) (documentação técnica)
- [Proof of Intention Architecture](./PROOF_OF_INTENTION_ARCHITECTURE.md)

---

**Status:** Guia de Implementação | **Autor:** NΞØ Protocol | **Data:** 2025
