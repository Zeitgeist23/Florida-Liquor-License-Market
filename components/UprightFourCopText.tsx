export default function UprightFourCopText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(4(?=COP))/g).map((part, index) =>
        part === "4" ? (
          <span className="upright-four-cop" key={`${part}-${index}`}>
            4
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
