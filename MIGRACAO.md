# Compatibilidade e migração — WEPEMOY APP v1

A aplicação trabalha sem apagar dados existentes. A leitura entende campos legados conhecidos e os campos canônicos da v1:

| Campo legado | Campo v1 |
|---|---|
| `nome` | `name` |
| `caixa` | `cash` |
| `titulos` | `titles` |
| `vices` | `runnersUp` |
| `empresa` | `companyId` |
| `timeAtual` | `teamId` |
| `valor` | `value` |
| `lucratividade` | `profit` |

## Configurações antigas

Se `config/sistema` ainda não existir, depois do login autorizado a aplicação consulta `config/valores` e interpreta:

- `custoCriacao` → `creationCost`
- `pctEmpresaTitulo` → `companyShare`
- `valColetivo` → `collectiveValue`
- `valIndividual` → `individualValue`
- `bonusMult` → `bonusMultiplier`
- `pctVenda` → `saleFee`
- `titulo_br`, `titulo_copa`, `titulo_cont`, `titulo_mund` → premiações correspondentes.

Ao salvar os parâmetros na administração, o sistema grava o novo documento `config/sistema`. O documento legado não é removido nem alterado. Ele pode conter campos de acesso antigos; por isso as regras do Firestore limitam a leitura de `config/valores` a administradores.

## Museu antigo

O documento `museo/principal` é lido como fonte histórica para Campeões, Lendas, Bola de Ouro e Chuteira de Ouro quando não há registros na coleção `museu`. Os itens são exibidos sem serem apagados nem copiados automaticamente.

## Importante

A compatibilidade acima é de leitura. Antes de editar manualmente registros legados, faça exportação/backup pelo Firebase Console. Novos cadastros e operações gravam os campos canônicos da v1. Não execute scripts de limpeza ou migração destrutiva sem conferir os vínculos de times, empresas e jogadores.

## Bônus legado da LEF

Os cadastros LEF antigos identificados pelo campo `activeSeasons` armazenavam `bonus` como percentual (0–100). Na fórmula v1, esses valores são interpretados como multiplicador percentual (`bonus / 100`). Cadastros do WEPEMOY BANK sem `activeSeasons` mantêm `bonus` como multiplicador (`1.0x`, `1.5x` etc.). Novos cadastros usam multiplicador.
