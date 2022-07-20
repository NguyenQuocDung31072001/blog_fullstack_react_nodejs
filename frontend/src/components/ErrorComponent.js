
export default function ErrorComponent({ error }) {
    return (
      <div className="text-red-500 p-4 border border-red-500">
        {error.message}
      </div>
    );
}