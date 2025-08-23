// New File: frontend/src/components/UsersTab.jsx
import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-hot-toast"; // Import toast

const UsersTab = () => {
    const { users, loading, fetchAllUsers, updateUserRole, user: currentUser } = useUserStore(); // Get current logged-in user

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const handleRoleChange = async (userId, newRole) => {
        if (currentUser._id === userId) {
            toast.error("You cannot change your own role.");
            return;
        }
        if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            await updateUserRole(userId, newRole);
        }
    };

    if (loading && users.length === 0) return <LoadingSpinner />;

    return (
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-4 text-emerald-400'>User Management</h2>
            {users.length === 0 && !loading && (
                <p className="text-gray-400">No users registered yet.</p>
            )}
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-gray-700'>
                    <thead>
                        <tr>
                            <th className='py-3 px-4 text-left text-gray-300'>Name</th>
                            <th className='py-3 px-4 text-left text-gray-300'>Email</th>
                            <th className='py-3 px-4 text-left text-gray-300'>Current Role</th>
                            <th className='py-3 px-4 text-left text-gray-300'>Verification</th> {/* NEW */}
                            <th className='py-3 px-4 text-left text-gray-300'>Seller Request</th> {/* NEW */}
                            <th className='py-3 px-4 text-left text-gray-300'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className='border-t border-gray-600 hover:bg-gray-600/50'>
                                <td className='py-3 px-4'>{user.name}</td>
                                <td className='py-3 px-4'>{user.email}</td>
                                <td className='py-3 px-4 capitalize'>{user.role}</td>
                                <td className='py-3 px-4'>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {user.isVerified ? 'Verified' : 'Unverified'}
                                    </span>
                                </td>
                                <td className='py-3 px-4 capitalize'>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.sellerRequestStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        user.sellerRequestStatus === 'approved' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {user.sellerRequestStatus}
                                    </span>
                                </td>
                                <td className='py-3 px-4'>
                                    {user.role !== 'admin' && ( // Admin cannot change their own role or other admins' roles via this UI
                                        <div className='flex gap-2'>
                                            {user.role !== 'seller' && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'seller')}
                                                    className='bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50'
                                                    disabled={user.role === 'admin' || user.role === 'seller'}
                                                    title={user.role === 'seller' ? 'Already a seller' : 'Promote to Seller'}
                                                >
                                                    Make Seller
                                                </button>
                                            )}
                                            {user.role !== 'user' && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'user')}
                                                    className='bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50'
                                                    disabled={user.role === 'admin' || user.role === 'user'}
                                                    title={user.role === 'user' ? 'Already a user' : 'Demote to User'}
                                                >
                                                    Make User
                                                </button>
                                            )}
                                            {/* Optionally add "Reject Seller Request" button if status is pending and role is user */}
                                            {user.sellerRequestStatus === 'pending' && user.role === 'user' && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'user')} // Changing role to user effectively rejects it
                                                    className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm'
                                                    title="Reject seller request and keep as regular user"
                                                >
                                                    Reject Request
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTab;