# Instruções de Deploy

Este projeto utiliza GitHub Actions para automatizar o deploy para AWS (S3 + CloudFront).

## Pré-requisitos

1. Bucket S3 já configurado para hospedar um site estático
2. Distribuição CloudFront configurada para apontar para o bucket S3
3. Usuário IAM com permissões para:
   - Fazer upload de arquivos para o bucket S3
   - Criar invalidações no CloudFront

## Configuração dos Secrets no GitHub

Para que o workflow de deploy funcione corretamente, você precisa configurar os seguintes secrets no seu repositório GitHub:

1. Vá para seu repositório no GitHub
2. Clique em "Settings" > "Secrets and variables" > "Actions"
3. Adicione os seguintes secrets:

| Nome do Secret | Descrição |
|----------------|-----------|
| `AWS_ACCESS_KEY_ID` | ID da chave de acesso do usuário IAM |
| `AWS_SECRET_ACCESS_KEY` | Chave secreta do usuário IAM |
| `AWS_REGION` | Região da AWS onde estão os recursos (ex: us-east-1) |
| `S3_BUCKET_NAME` | Nome do bucket S3 onde o site será hospedado |
| `CLOUDFRONT_DISTRIBUTION_ID` | ID da distribuição CloudFront |

## Permissões IAM Necessárias

O usuário IAM cujas credenciais são usadas no GitHub Actions deve ter as seguintes permissões:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::seu-bucket-name",
                "arn:aws:s3:::seu-bucket-name/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "*"
        }
    ]
}
```

## Como funciona o deploy

1. Quando você faz push para a branch `main` ou executa o workflow manualmente, o GitHub Actions:
   - Constrói o projeto Astro
   - Faz upload dos arquivos gerados para o bucket S3
   - Invalida o cache do CloudFront para que as alterações sejam refletidas imediatamente

## Testando o deploy

Você pode testar o deploy manualmente indo até a aba "Actions" no GitHub, selecionando o workflow "Deploy to AWS" e clicando em "Run workflow".
