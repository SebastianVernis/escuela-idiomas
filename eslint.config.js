import globals from "globals";

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                showNotification: "readonly",
                getUserData: "readonly",
                Chart: "readonly",
                getAuthToken: "readonly",
                showLoading: "readonly",
                formatDate: "readonly",
                updatePagination: "readonly",
                loadUsers: "readonly",
                loadLibrary: "readonly",
                loadDashboardData: "readonly",
                loadPayments: "readonly",
                loadClasses: "readonly",
                loadReports: "readonly",
                filterUsers: "readonly",
                filterBooks: "readonly",
                showAddBookModal: "readonly",
                addBook: "readonly",
                viewUser: "readonly",
                editUser: "readonly",
                deleteUser: "readonly",
                viewBook: "readonly",
                editBook: "readonly",
                deleteBook: "readonly",
                logout: "readonly",
                Stripe: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn"
        }
    }
];