"use client"
export default function Footer(){
    return (
        <footer className="border-t bg-white">
            <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Nom du projet */}
                    <p className="text-sm font-medium">
                        Entraide
                    </p>

                    {/* Informations complémentaires */}
                    <p className="text-sm text-gray-500">
                        Un espace déchange sans jugement.
                    </p>
                </div>
                {/* Copyright  */}
             
              <p className="mt-6 text-xs text-gray-400">
              © 2026 Entraide
              </p>  
            </div>
        </footer>
    )
}