interface ErrorStateProps {
  onRetry: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <p className="text-sm text-hyperlayer-grey">Couldn&apos;t load demo data.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 text-sm font-medium text-hyperlayer-blue"
      >
        Try again
      </button>
    </div>
  );
}
