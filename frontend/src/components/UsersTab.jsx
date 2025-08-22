import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import LoadingSpinner from "./LoadingSpinner";

const UsersTab = () => {
    const { users, loading, fetchAllUsers, updateUserRole, user: currentUser } = useUserStore();

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const handleRoleChange = (userId, newRole) => {
        if (currentUser._id === userId) {
            alert("You cannot change your own role.");
            return;
        }
        updateUserRole(userId, newRole);
    };

    if (loading && users.length === 0) return <LoadingSpinner />;

    return (
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-4 text-emerald-400'>User Management</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-gray-700'>
                    <thead>
                        <tr>
                            <th className='py-3 px-4 text-left text-gray-300'>Name</th>
                            <th className='py-3 px-4 text-left text-gray-300'>Email</th>
                            <th className='py-3 px-4 text-left text-gray-300'>Current Role</th>
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
                                    {user.role !== 'admin' && (
                                        <div className='flex gap-2'>
                                            {user.role !== 'seller' && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'seller')}
                                                    className='bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm'
                                                >
                                                    Make Seller
                                                </button>
                                            )}
                                            {user.role !== 'user' && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'user')}
                                                    className='bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm'
                                                >
                                                    Make User
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