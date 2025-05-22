import { Alert, AlertTitle, Button, Box } from '@mui/material';
import type { ErrorBannerProps } from '../interfaces/Country.interface';

const ErrorBanner = ({ error, onRetry }: ErrorBannerProps) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Alert
                severity="error"
                action={
                    <Button color="inherit" size="small" onClick={onRetry}>
                        Retry
                    </Button>
                }
                role="alert"
                aria-live="assertive"
            >
                <AlertTitle>Error</AlertTitle>
                {error}
            </Alert>
        </Box>
    );
};

export default ErrorBanner;
