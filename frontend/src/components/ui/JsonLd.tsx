type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Данные формируются на сервере из конфигурации, пользовательский ввод сюда не попадает.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
