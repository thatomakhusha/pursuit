export default function PageHeader({ title, subtitle, action }:{ title: string; subtitle: string; action?: React.ReactNode }){
    return (
        <div className="mb-8 flex items-start justify-between">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    {title}
                </h1>
                {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
            </div>
            {action}
        </div>
    );
}