import { useSession } from "next-auth/react";

const HalamanEditor = () => {
    const { data }: any = useSession();

    return (
        <div>
            <h1>Halaman Editor</h1>
            <p>Selamat datang {data?.user?.fullname}</p>
            <p>
                Halaman ini khusus untuk editor. Di sini editor dapat mengelola konten,
                menyusun draft, dan memperbarui informasi yang perlu ditinjau sebelum
                dipublikasikan.
            </p>
        </div>
    );
};

export default HalamanEditor;