"use client";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";

export default function Navbar() {


  //nav links
  const NavLinks = () => {
    const currentPath = usePathname()
    const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues", href: "/issues/list" },
    ];

    return (<ul className="flex  text-lg">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>)
  }

  const AuthStatus = () => {
    const { data: session, status } = useSession()
    if (status === "loading") return <Skeleton width={"3rem"} />
    if (status === "unauthenticated") return <Link href={"/api/auth/signin"}>Sing In</Link>
    return (
      <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar src={session!.user!.image!} fallback="?" size={"2"} radius="full" className="cursor-pointer" referrerPolicy="no-referrer" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size={"2"}>
                {session!.user!.email}
              </Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href={"/api/auth/signout"} >Sign Out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>

        </DropdownMenu.Root>

      </Box>
    )
  }


  return (
    <nav className="flex space-x-6 border-b shadow-sm mb-5 px-5 h-14 items-center  ">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}
