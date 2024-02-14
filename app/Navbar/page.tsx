"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

export default function Navbar() {
  const currentPath = usePathname();
  const { data: session, status } = useSession()
  console.log(session)


  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="flex space-x-6 border-b shadow-sm mb-5 px-5 h-14 items-center  ">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <ul className="flex  space-x-6 ">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Box>

            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar src={session.user!.image!} fallback="?" size={"2"} radius="full" className="cursor-pointer" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size={"2"}>
                      {session.user!.email}
                    </Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href={"/api/auth/signout"} >Sign Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>

              </DropdownMenu.Root>

            )}
            {status === "unauthenticated" &&
              <Link href={"/api/auth/signin"}>Sign In</Link>
            }

          </Box>
        </Flex>

      </Container>

    </nav>
  );
}
